"use client";
import { useEffect, useRef } from "react";

type GL = WebGL2RenderingContext | WebGLRenderingContext;

type UniformMap = Record<string, WebGLUniformLocation>;

type SupportedFormat = {
  internalFormat: number;
  format: number;
};

type TextureFormat = SupportedFormat | null;

type WebGLContext = {
  gl: GL;
  ext: {
    formatRGBA: TextureFormat;
    formatRG: TextureFormat;
    formatR: TextureFormat;
    halfFloatTexType: number;
    supportLinearFiltering: boolean;
  };
};

type FBO = {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach(id: number): number;
};

type DoubleFBO = {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap(): void;
};

type ColorRGB = {
  r: number;
  g: number;
  b: number;
};

class PointerData {
  id = -1;
  texcoordX = 0;
  texcoordY = 0;
  prevTexcoordX = 0;
  prevTexcoordY = 0;
  deltaX = 0;
  deltaY = 0;
  down = false;
  moved = false;
  color: ColorRGB = { r: 0, g: 0, b: 0 };
}

const FluidCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl = canvas;

    let animationFrameId: number | null = null;

    const config = {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1440,
      CAPTURE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 3.5,
      VELOCITY_DISSIPATION: 2,
      PRESSURE: 0.1,
      PRESSURE_ITERATIONS: 20,
      CURL: 3,
      SPLAT_RADIUS: 0.2,
      SPLAT_FORCE: 6000,
      SHADING: true,
      COLOR_UPDATE_SPEED: 10,
      PAUSED: false,
      BACK_COLOR: { r: 0, g: 0, b: 0 },
      TRANSPARENT: true,
    };

    const pointers: PointerData[] = [new PointerData()];
    pointers[0].color = { r: 0, g: 0, b: 0 };

    const { gl, ext } = getWebGLContext(canvas);

    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }

    function getWebGLContext(canvas: HTMLCanvasElement): WebGLContext {
      const params: WebGLContextAttributes = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };

      let gl: GL | null = canvas.getContext(
        "webgl2",
        params,
      ) as WebGL2RenderingContext | null;
      const isWebGL2 = !!gl;
      if (!isWebGL2) {
        gl = (canvas.getContext("webgl", params) ||
          canvas.getContext("experimental-webgl", params)) as GL | null;
      }

      if (!gl) {
        throw new Error("WebGL is not supported");
      }

      const glContext: GL = gl;
      let halfFloat: { HALF_FLOAT_OES: number } | null = null;
      let supportLinearFiltering = false;

      if (isWebGL2) {
        glContext.getExtension("EXT_color_buffer_float");
        supportLinearFiltering = !!glContext.getExtension(
          "OES_texture_float_linear",
        );
      } else {
        halfFloat = glContext.getExtension("OES_texture_half_float");
        supportLinearFiltering = !!glContext.getExtension(
          "OES_texture_half_float_linear",
        );
      }

      glContext.clearColor(0.0, 0.0, 0.0, 1.0);

      const halfFloatTexType: number = isWebGL2
        ? (glContext as WebGL2RenderingContext).HALF_FLOAT
        : halfFloat!.HALF_FLOAT_OES;
      let formatRGBA: TextureFormat = null;
      let formatRG: TextureFormat = null;
      let formatR: TextureFormat = null;

      if (isWebGL2) {
        const gl2 = glContext as WebGL2RenderingContext;
        formatRGBA = getSupportedFormat(
          gl2,
          gl2.RGBA16F,
          gl2.RGBA,
          halfFloatTexType,
        );
        formatRG = getSupportedFormat(gl2, gl2.RG16F, gl2.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl2, gl2.R16F, gl2.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(
          glContext,
          glContext.RGBA,
          glContext.RGBA,
          halfFloatTexType,
        );
        formatRG = getSupportedFormat(
          glContext,
          glContext.RGBA,
          glContext.RGBA,
          halfFloatTexType,
        );
        formatR = getSupportedFormat(
          glContext,
          glContext.RGBA,
          glContext.RGBA,
          halfFloatTexType,
        );
      }

      return {
        gl: glContext,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering,
        },
      };
    }

    function getSupportedFormat(
      gl: GL,
      internalFormat: number,
      format: number,
      type: number,
    ): TextureFormat {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        const glAny = gl as unknown as Record<string, number>;
        switch (internalFormat) {
          case glAny.R16F:
            return getSupportedFormat(gl, glAny.RG16F, glAny.RG, type);
          case glAny.RG16F:
            return getSupportedFormat(gl, glAny.RGBA16F, glAny.RGBA, type);
          default:
            return null;
        }
      }

      return {
        internalFormat,
        format,
      };
    }

    function supportRenderTextureFormat(
      gl: GL,
      internalFormat: number,
      format: number,
      type: number,
    ): boolean {
      const texture = gl.createTexture();
      if (!texture) {
        return false;
      }
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        internalFormat,
        4,
        4,
        0,
        format,
        type,
        null,
      );

      const fbo = gl.createFramebuffer();
      if (!fbo) {
        return false;
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0,
      );

      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status === gl.FRAMEBUFFER_COMPLETE;
    }

    // eslint-disable-next-line react-hooks/unsupported-syntax
    class Material {
      vertexShader: WebGLShader;
      fragmentShaderSource: string;
      programs: Array<WebGLProgram | null>;
      activeProgram: WebGLProgram | null;
      uniforms: UniformMap;

      constructor(vertexShader: WebGLShader, fragmentShaderSource: string) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = [];
        this.activeProgram = null;
        this.uniforms = {};
      }

      setKeywords(keywords: string[]) {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);

        let program = this.programs[hash];
        if (program == null) {
          const fragmentShader = compileShader(
            gl.FRAGMENT_SHADER,
            this.fragmentShaderSource,
            keywords,
          );
          program = createProgram(this.vertexShader, fragmentShader);
          this.programs[hash] = program;
        }

        if (program === this.activeProgram) return;

        this.uniforms = getUniforms(program);
        this.activeProgram = program;
      }

      bind() {
        if (this.activeProgram) {
          gl.useProgram(this.activeProgram);
        }
      }
    }

    // eslint-disable-next-line react-hooks/unsupported-syntax
    class Program {
      program: WebGLProgram;
      uniforms: UniformMap;

      constructor(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        this.program = createProgram(vertexShader, fragmentShader);
        this.uniforms = getUniforms(this.program);
      }

      bind() {
        gl.useProgram(this.program);
      }
    }

    function createProgram(
      vertexShader: WebGLShader,
      fragmentShader: WebGLShader,
    ): WebGLProgram {
      const program = gl.createProgram();
      if (!program) {
        throw new Error("Unable to create WebGL program");
      }
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.trace(gl.getProgramInfoLog(program));

      return program;
    }

    function getUniforms(program: WebGLProgram): UniformMap {
      const uniforms: UniformMap = {};
      const uniformCount = gl.getProgramParameter(
        program,
        gl.ACTIVE_UNIFORMS,
      ) as number;
      for (let i = 0; i < uniformCount; i++) {
        const activeUniform = gl.getActiveUniform(program, i);
        if (!activeUniform) continue;
        const uniformName = activeUniform.name;
        const location = gl.getUniformLocation(program, uniformName);
        if (location) {
          uniforms[uniformName] = location;
        }
      }
      return uniforms;
    }

    function compileShader(
      type: number,
      source: string,
      keywords: string[] | null = null,
    ): WebGLShader {
      source = addKeywords(source, keywords);

      const shader = gl.createShader(type);
      if (!shader) {
        throw new Error("Unable to create WebGL shader");
      }
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        console.trace(gl.getShaderInfoLog(shader));

      return shader;
    }

    function addKeywords(source: string, keywords: string[] | null): string {
      if (keywords == null) return source;
      let keywordsString = "";
      keywords.forEach((keyword) => {
        keywordsString += "#define " + keyword + "\n";
      });

      return keywordsString + source;
    }

    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
      precision highp float;

      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;

      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `,
    );

    const copyShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;

      varying highp vec2 vUv;
      uniform sampler2D uTexture;

      void main () {
        gl_FragColor = texture2D(uTexture, vUv);
      }
    `,
    );

    const clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;

      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;

      void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
      }
    `,
    );

    const displayShaderSource = `
      precision highp float;
      precision highp sampler2D;

      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform vec2 texelSize;

      void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;

        #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
        #endif

        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
      }
    `;

    const splatShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;

      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;

      void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `,
    );

    const advectionShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;

      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform vec2 dyeTexelSize;
      uniform float dt;
      uniform float dissipation;

      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;

        vec2 iuv = floor(st);
        vec2 fuv = fract(st);

        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
      }

      void main () {
        #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
        #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
        #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
      }`,
      ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"],
    );

    const divergenceShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;

      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `,
    );

    const curlShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;

      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `,
    );

    const vorticityShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;

      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;

      void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;

        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `,
    );

    const pressureShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;

      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;

      void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `,
    );

    const gradientSubtractShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;

      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;

      void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `,
    );

    const blit = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
        gl.STATIC_DRAW,
      );
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array([0, 1, 2, 0, 2, 3]),
        gl.STATIC_DRAW,
      );
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);

      return (target: FBO | null, clear = false) => {
        if (target == null) {
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
          gl.viewport(0, 0, target.width, target.height);
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        if (clear) {
          gl.clearColor(0.0, 0.0, 0.0, 1.0);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    let dye: DoubleFBO | null = null;
    let velocity: DoubleFBO | null = null;
    let divergence: FBO | null = null;
    let curl: FBO | null = null;
    let pressure: DoubleFBO | null = null;

    const copyProgram = new Program(baseVertexShader, copyShader);
    const clearProgram = new Program(baseVertexShader, clearShader);
    const splatProgram = new Program(baseVertexShader, splatShader);
    const advectionProgram = new Program(baseVertexShader, advectionShader);
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);
    const curlProgram = new Program(baseVertexShader, curlShader);
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);
    const pressureProgram = new Program(baseVertexShader, pressureShader);
    const gradienSubtractProgram = new Program(
      baseVertexShader,
      gradientSubtractShader,
    );

    const displayMaterial = new Material(baseVertexShader, displayShaderSource);

    function initFramebuffers() {
      const simRes = getResolution(config.SIM_RESOLUTION);
      const dyeRes = getResolution(config.DYE_RESOLUTION);

      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA!;
      const rg = ext.formatRG!;
      const r = ext.formatR!;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

      gl.disable(gl.BLEND);

      if (dye == null)
        dye = createDoubleFBO(
          dyeRes.width,
          dyeRes.height,
          rgba.internalFormat,
          rgba.format,
          texType,
          filtering,
        );
      else
        dye = resizeDoubleFBO(
          dye,
          dyeRes.width,
          dyeRes.height,
          rgba.internalFormat,
          rgba.format,
          texType,
          filtering,
        );

      if (velocity == null)
        velocity = createDoubleFBO(
          simRes.width,
          simRes.height,
          rg.internalFormat,
          rg.format,
          texType,
          filtering,
        );
      else
        velocity = resizeDoubleFBO(
          velocity,
          simRes.width,
          simRes.height,
          rg.internalFormat,
          rg.format,
          texType,
          filtering,
        );

      divergence = createFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST,
      );
      curl = createFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST,
      );
      pressure = createDoubleFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST,
      );
    }

    function createFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number,
    ): FBO {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      if (!texture) {
        throw new Error("Unable to create texture");
      }
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        internalFormat,
        w,
        h,
        0,
        format,
        type,
        null,
      );

      const fbo = gl.createFramebuffer();
      if (!fbo) {
        throw new Error("Unable to create framebuffer");
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0,
      );
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const texelSizeX = 1.0 / w;
      const texelSizeY = 1.0 / h;

      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach(id: number) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number,
    ): DoubleFBO {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);

      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
          return fbo1;
        },
        set read(value: FBO) {
          fbo1 = value;
        },
        get write() {
          return fbo2;
        },
        set write(value: FBO) {
          fbo2 = value;
        },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    function resizeFBO(
      target: FBO,
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number,
    ): FBO {
      const newFBO = createFBO(w, h, internalFormat, format, type, param);
      copyProgram.bind();
      gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
      blit(newFBO);
      return newFBO;
    }

    function resizeDoubleFBO(
      target: DoubleFBO,
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number,
    ): DoubleFBO {
      if (target.width === w && target.height === h) return target;
      target.read = resizeFBO(
        target.read,
        w,
        h,
        internalFormat,
        format,
        type,
        param,
      );
      target.write = createFBO(w, h, internalFormat, format, type, param);
      target.width = w;
      target.height = h;
      target.texelSizeX = 1.0 / w;
      target.texelSizeY = 1.0 / h;
      return target;
    }

    function updateKeywords() {
      const displayKeywords = [];
      if (config.SHADING) displayKeywords.push("SHADING");
      displayMaterial.setKeywords(displayKeywords);
    }

    updateKeywords();
    initFramebuffers();

    let lastUpdateTime = Date.now();
    // const colorUpdateTimer = 0.0;

    function update() {
      const dt = calcDeltaTime();
      if (resizeCanvas()) initFramebuffers();
      updateColors(dt);
      applyInputs();
      step(dt);
      render(null);
      animationFrameId = requestAnimationFrame(update);
    }

    function calcDeltaTime() {
      const now = Date.now();
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastUpdateTime = now;
      return dt;
    }

    function resizeCanvas() {
      const width = scaleByPixelRatio(canvasEl.clientWidth);
      const height = scaleByPixelRatio(canvasEl.clientHeight);
      if (canvasEl.width != width || canvasEl.height != height) {
        canvasEl.width = width;
        canvasEl.height = height;
        return true;
      }
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function updateColors(_dt: number) {
      pointers.forEach((p) => {
        p.color = generateColor();
      });
    }

    function applyInputs() {
      pointers.forEach((p) => {
        if (p.moved) {
          p.moved = false;
          splatPointer(p);
        }
      });
    }

    function step(dt: number) {
      if (!velocity || !pressure || !divergence || !curl || !dye) return;
      const velocityLocal = velocity;
      const pressureLocal = pressure;
      const divergenceLocal = divergence;
      const curlLocal = curl;
      const dyeLocal = dye;

      gl.disable(gl.BLEND);

      curlProgram.bind();
      gl.uniform2f(
        curlProgram.uniforms.texelSize,
        velocityLocal.texelSizeX,
        velocityLocal.texelSizeY,
      );
      gl.uniform1i(
        curlProgram.uniforms.uVelocity,
        velocityLocal.read.attach(0),
      );
      blit(curlLocal);

      vorticityProgram.bind();
      gl.uniform2f(
        vorticityProgram.uniforms.texelSize,
        velocityLocal.texelSizeX,
        velocityLocal.texelSizeY,
      );
      gl.uniform1i(
        vorticityProgram.uniforms.uVelocity,
        velocityLocal.read.attach(0),
      );
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curlLocal.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocityLocal.write);
      velocityLocal.swap();

      divergenceProgram.bind();
      gl.uniform2f(
        divergenceProgram.uniforms.texelSize,
        velocityLocal.texelSizeX,
        velocityLocal.texelSizeY,
      );
      gl.uniform1i(
        divergenceProgram.uniforms.uVelocity,
        velocityLocal.read.attach(0),
      );
      blit(divergenceLocal);

      clearProgram.bind();
      gl.uniform1i(
        clearProgram.uniforms.uTexture,
        pressureLocal.read.attach(0),
      );
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
      blit(pressureLocal.write);
      pressureLocal.swap();

      pressureProgram.bind();
      gl.uniform2f(
        pressureProgram.uniforms.texelSize,
        velocityLocal.texelSizeX,
        velocityLocal.texelSizeY,
      );
      gl.uniform1i(
        pressureProgram.uniforms.uDivergence,
        divergenceLocal.attach(0),
      );
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(
          pressureProgram.uniforms.uPressure,
          pressureLocal.read.attach(1),
        );
        blit(pressureLocal.write);
        pressureLocal.swap();
      }

      gradienSubtractProgram.bind();
      gl.uniform2f(
        gradienSubtractProgram.uniforms.texelSize,
        velocityLocal.texelSizeX,
        velocityLocal.texelSizeY,
      );
      gl.uniform1i(
        gradienSubtractProgram.uniforms.uPressure,
        pressureLocal.read.attach(0),
      );
      gl.uniform1i(
        gradienSubtractProgram.uniforms.uVelocity,
        velocityLocal.read.attach(1),
      );
      blit(velocityLocal.write);
      velocityLocal.swap();

      advectionProgram.bind();
      gl.uniform2f(
        advectionProgram.uniforms.texelSize,
        velocityLocal.texelSizeX,
        velocityLocal.texelSizeY,
      );
      if (!ext.supportLinearFiltering) {
        gl.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          velocityLocal.texelSizeX,
          velocityLocal.texelSizeY,
        );
      }
      const velocityId = velocityLocal.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(
        advectionProgram.uniforms.dissipation,
        config.VELOCITY_DISSIPATION,
      );
      blit(velocityLocal.write);
      velocityLocal.swap();

      if (!ext.supportLinearFiltering) {
        gl.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          dyeLocal.texelSizeX,
          dyeLocal.texelSizeY,
        );
      }
      gl.uniform1i(
        advectionProgram.uniforms.uVelocity,
        velocityLocal.read.attach(0),
      );
      gl.uniform1i(advectionProgram.uniforms.uSource, dyeLocal.read.attach(1));
      gl.uniform1f(
        advectionProgram.uniforms.dissipation,
        config.DENSITY_DISSIPATION,
      );
      blit(dyeLocal.write);
      dyeLocal.swap();
    }

    function render(target: FBO | null) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      drawDisplay(target);
    }

    function drawDisplay(target: FBO | null) {
      const width = target == null ? gl.drawingBufferWidth : target.width;
      const height = target == null ? gl.drawingBufferHeight : target.height;

      displayMaterial.bind();
      if (config.SHADING)
        gl.uniform2f(
          displayMaterial.uniforms.texelSize,
          1.0 / width,
          1.0 / height,
        );
      if (dye) {
        gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
        blit(target);
      }
    }

    function splatPointer(pointer: PointerData) {
      const dx = pointer.deltaX * config.SPLAT_FORCE;
      const dy = pointer.deltaY * config.SPLAT_FORCE;
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }

    function clickSplat(pointer: PointerData) {
      const dx = 10 * (Math.random() - 0.5);
      const dy = 30 * (Math.random() - 0.5);
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }

    function splat(
      x: number,
      y: number,
      dx: number,
      dy: number,
      color: ColorRGB,
    ) {
      if (!velocity || !dye) return;
      const velocityLocal = velocity;
      const dyeLocal = dye;

      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.uTarget, velocityLocal.read.attach(0));
      gl.uniform1f(
        splatProgram.uniforms.aspectRatio,
        canvasEl.width / canvasEl.height,
      );
      gl.uniform2f(splatProgram.uniforms.point, x, y);
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
      gl.uniform1f(
        splatProgram.uniforms.radius,
        correctRadius(config.SPLAT_RADIUS / 100.0),
      );
      blit(velocityLocal.write);
      velocityLocal.swap();

      gl.uniform1i(splatProgram.uniforms.uTarget, dyeLocal.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      blit(dyeLocal.write);
      dyeLocal.swap();
    }

    function correctRadius(radius: number): number {
      const aspectRatio = canvasEl.width / canvasEl.height;
      if (aspectRatio > 1) radius *= aspectRatio;
      return radius;
    }

    function hashCode(s: string): number {
      if (s.length == 0) return 0;
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0;
      }
      return hash;
    }

    // function wrap(value: number, min: number, max: number): number {
    //   const range = max - min;
    //   if (range == 0) return min;
    //   return ((value - min) % range) + min;
    // }

    function getResolution(resolution: number) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;

      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);

      if (gl.drawingBufferWidth > gl.drawingBufferHeight)
        return { width: max, height: min };
      else return { width: min, height: max };
    }

    function scaleByPixelRatio(input: number): number {
      const pixelRatio = window.devicePixelRatio || 1;
      return Math.floor(input * pixelRatio);
    }

    function generateColor(): ColorRGB {
      const color = HSVtoRGB(Math.random(), 1.0, 1.0);
      return {
        r: color.r * 0.15,
        g: color.g * 0.15,
        b: color.b * 0.15,
      };
    }

    function HSVtoRGB(h: number, s: number, v: number): ColorRGB {
      let r = 0;
      let g = 0;
      let b = 0;
      let i = 0;
      let f = 0;
      let p = 0;
      let q = 0;
      let t = 0;
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
        default:
          break;
      }

      return { r, g, b };
    }

    function updatePointerDownData(
      pointer: PointerData,
      id: number,
      posX: number,
      posY: number,
    ) {
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / canvasEl.width;
      pointer.texcoordY = 1.0 - posY / canvasEl.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    }

    function updatePointerMoveData(
      pointer: PointerData,
      posX: number,
      posY: number,
      color: ColorRGB,
    ) {
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvasEl.width;
      pointer.texcoordY = 1.0 - posY / canvasEl.height;
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
      pointer.moved =
        Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
      pointer.color = color;
    }

    function correctDeltaX(delta: number): number {
      const aspectRatio = canvasEl.width / canvasEl.height;
      if (aspectRatio < 1) delta *= aspectRatio;
      return delta;
    }

    function correctDeltaY(delta: number): number {
      const aspectRatio = canvasEl.width / canvasEl.height;
      if (aspectRatio > 1) delta /= aspectRatio;
      return delta;
    }
    /*
    const handleMouseDown = (e) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      updatePointerDownData(pointer, -1, posX, posY);
      clickSplat(pointer);
    };

    const handleMouseMove = (e) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      let color = pointer.color;
      updatePointerMoveData(pointer, posX, posY, color);
    };
    */
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const blockedElement = target?.closest(
        "button, a, input, textarea, select, nav, form, .card-with-floating-elements, [class*='card'], [class*='Card'], [class*='modal'], [class*='popup'], [class*='rounded'], [class*='shadow']",
      );

      if (blockedElement) return;

      const pointer = pointers[0];
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);

      updatePointerDownData(pointer, -1, posX, posY);
      clickSplat(pointer);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const blockedElement = target?.closest(
        "button, a, input, textarea, select, nav, form, .card-with-floating-elements, [class*='card'], [class*='Card'], [class*='modal'], [class*='popup'], [class*='rounded'], [class*='shadow']",
      );

      if (blockedElement) return;

      const pointer = pointers[0];
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      const color = pointer.color;

      updatePointerMoveData(pointer, posX, posY, color);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touches = e.targetTouches;
      const pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        const posX = scaleByPixelRatio(touches[i].clientX);
        const posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touches = e.targetTouches;
      const pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        const posX = scaleByPixelRatio(touches[i].clientX);
        const posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerMoveData(pointer, posX, posY, pointer.color);
      }
    };

    const handleTouchEnd = () => {
      const pointer = pointers[0];
      pointer.down = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    update();

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-9999 pointer-events-none">
      <canvas ref={canvasRef} id="fluid" className="w-screen h-screen" />
    </div>
  );
};

export default FluidCursor;

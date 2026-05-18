import ProjectGrid from '@/components/project/project-grid';
import { AuroraText } from '@/components/utils/aurora-text';
import { generateMetadata as getMetadata } from '@/config/meta';
import { projectConfig } from '@/config/projects';

export const metadata = getMetadata('/projects');

export default function Projects() {
  return (
    <section className="mt-20 relative flex min-h-screen items-center justify-center overflow-hidden px-4 text-center">
      <div className="relative z-10 mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-7xl font-bold leading-tight">
          100+{' '}
          <AuroraText
            colors={['#22d3ee', '#3b82f6', '#6366f1', '#a855f7', '#ec4899']}
          >
            React JS
          </AuroraText>{' '}
          Projects
        </h1>

        <p className="mt-4 md:mt-6 text-sm md:text-xl text-foreground/60 max-w-2xl mx-auto">
          {projectConfig.description}
        </p>

        <ProjectGrid />
      </div>
    </section>
  );
}

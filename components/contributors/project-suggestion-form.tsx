"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ProjectSuggestionForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};

    if (!name.trim()) {
      errs.name = "Name is required";
    }

    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address";
    }

    if (!message.trim()) {
      errs.message = "Message is required";
    } else if (message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters";
    }

    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-background p-8 text-center shadow-sm">
        <p className="text-lg font-semibold text-foreground">
          Thank you for your suggestion!
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ll review your project idea and get back to you if needed.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setSubmitted(false)}
        >
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border bg-background p-6 shadow-sm text-left"
    >
      <h3 className="mb-4 text-lg font-semibold">Suggest a Project</h3>

      <div className="mb-4">
        <Label htmlFor="suggestion-name" className="mb-1.5 block">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="suggestion-name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      <div className="mb-4">
        <Label htmlFor="suggestion-email" className="mb-1.5 block">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="suggestion-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div className="mb-4">
        <Label htmlFor="suggestion-message" className="mb-1.5 block">
          Project Suggestion <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="suggestion-message"
          placeholder="Describe the project you'd like to see added"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Submit Suggestion
      </Button>
    </form>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

type FormState = {
  status: "idle" | "submitting" | "success";
  error?: string;
};

export default function EngagementForms() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState<FormState>({
    status: "idle",
  });
  const [contactState, setContactState] = useState<FormState>({
    status: "idle",
  });
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  const handleNewsletterSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidEmail(newsletterEmail)) {
      setNewsletterState({
        status: "idle",
        error: "Enter a valid email address.",
      });
      return;
    }

    setNewsletterState({ status: "submitting" });
    setTimeout(() => {
      setNewsletterState({ status: "success" });
      setNewsletterEmail("");
    }, 600);
  };

  const handleContactSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!contactForm.name.trim()) {
      setContactState({ status: "idle", error: "Add your name." });
      return;
    }

    if (!isValidEmail(contactForm.email)) {
      setContactState({ status: "idle", error: "Use a valid email." });
      return;
    }

    if (!contactForm.message.trim()) {
      setContactState({ status: "idle", error: "Add a short message." });
      return;
    }

    setContactState({ status: "submitting" });
    setTimeout(() => {
      setContactState({ status: "success" });
      setContactForm({ name: "", email: "", topic: "", message: "" });
    }, 700);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Newsletter</CardTitle>
          <CardDescription>
            Get new practice drops and curated React challenges.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleNewsletterSubmit}>
          <CardContent className="space-y-3">
            <Input
              type="email"
              value={newsletterEmail}
              onChange={(event) => setNewsletterEmail(event.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
            />
            {newsletterState.error && (
              <p className="text-xs text-destructive">
                {newsletterState.error}
              </p>
            )}
            {newsletterState.status === "success" && (
              <p className="text-xs text-emerald-500">
                You are in. Check your inbox soon.
              </p>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            <Button
              type="submit"
              disabled={newsletterState.status === "submitting"}
            >
              {newsletterState.status === "submitting"
                ? "Submitting"
                : "Join newsletter"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
          <CardDescription>
            Share feedback or request new modules.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleContactSubmit}>
          <CardContent className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                value={contactForm.name}
                onChange={(event) =>
                  setContactForm((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
                placeholder="Your name"
                aria-label="Name"
              />
              <Input
                type="email"
                value={contactForm.email}
                onChange={(event) =>
                  setContactForm((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
                placeholder="Email"
                aria-label="Email"
              />
            </div>
            <Input
              value={contactForm.topic}
              onChange={(event) =>
                setContactForm((prev) => ({
                  ...prev,
                  topic: event.target.value,
                }))
              }
              placeholder="Topic (optional)"
              aria-label="Topic"
            />
            <Textarea
              value={contactForm.message}
              onChange={(event) =>
                setContactForm((prev) => ({
                  ...prev,
                  message: event.target.value,
                }))
              }
              placeholder="Tell us what you need"
              aria-label="Message"
            />
            {contactState.error && (
              <p className="text-xs text-destructive">{contactState.error}</p>
            )}
            {contactState.status === "success" && (
              <p className="text-xs text-emerald-500">
                Message sent. We will follow up soon.
              </p>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            <Button
              type="submit"
              disabled={contactState.status === "submitting"}
            >
              {contactState.status === "submitting"
                ? "Sending"
                : "Send message"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

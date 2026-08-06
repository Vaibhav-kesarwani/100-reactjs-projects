"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dashboardConfig } from "@/config/dashboard";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, ListChecks } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export function DashboardWorkflowSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Card className="border border-sky-200/70 bg-white/80 shadow-[0_24px_70px_-50px_rgba(14,165,233,0.28)] backdrop-blur-xl dark:border-border/70 dark:bg-card/85 dark:shadow-none">
      <CardHeader className="gap-4 border-b border-border/60 pb-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <ListChecks className="h-5 w-5 text-primary" />
              Contribution workflow
            </CardTitle>
            <CardDescription className="mt-2 max-w-3xl text-sm leading-6">
              Follow the sequence from issue discovery to review-ready pull
              request. The arrows make the order explicit for first-time
              contributors.
            </CardDescription>
          </div>
          <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
            {dashboardConfig.contributionSteps.length} steps
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          {dashboardConfig.contributionSteps.map((step, index) => (
            <Fragment key={step.title}>
              <motion.div
                className="flex-1"
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <div className="h-full rounded-[1.75rem] border border-sky-200/55 bg-white/82 p-5 shadow-[0_18px_40px_-38px_rgba(59,130,246,0.25)] dark:border-border/60 dark:bg-background/55 dark:shadow-none">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={step.href}
                    target={step.external ? "_blank" : undefined}
                    rel={step.external ? "noreferrer" : undefined}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    {step.cta}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>

              {index < dashboardConfig.contributionSteps.length - 1 && (
                <div className="flex items-center justify-center text-primary/60">
                  <ArrowDown className="h-5 w-5 lg:hidden" />
                  <ArrowRight className="hidden h-5 w-5 lg:block" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import { Mail, LinkedIn, X } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  return (
    <div className="md:grid md:grid-cols-5 md:gap-8">
      <div className="space-y-4 md:hidden">
        <Image
          alt="Patrick Coleman"
          className="mx-auto rounded-full object-cover mt-0 mb-8"
          style={{ boxShadow: `0 0px 3px var(--grid)` }}
          src="/images/patrick.png"
          width={150}
          height={150}
        />
      </div>
      <div className="space-y-4 md:col-span-3">
        <h1>Patrick Coleman</h1>
        <p className="large">hello out there 👋 </p>
        <p>I&apos;m a generalist. Professionally,
          I do everything from sales and marketing to 
          finance and ops, plus a bit of product and{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/patrickscoleman"
          >
            coding
          </Link>, mostly for startups.</p>
        <p>
          I currently lead growth at{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://rime.ai/"
          >
            Rime
          </Link>. We're building voice AI foundational models. 
        </p>
        <p>
          Before that, I co-founded{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.yaya.press"
          >
            Yaya
          </Link>
          , an AI foreign language learning app, and was an early growth and ops leader at{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://replit.com"
          >
            Replit
          </Link>{" "}
          and{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://peoplegrove.com"
          >
            PeopleGrove
          </Link>
          . I started my career in investment banking.
        </p>
        <p>
          Personally, I&apos;m a husband and dog dad. I speak a few languages
          (best to worst: English, español, 日本語, 한국어). 
          Some things I love: fiction, comics, music, meditation, travel, tattoos, climbing, biking, and just being outside.
        </p>
        <div className="flex justify-center gap-4 py-4">
          <Link href="/blog" className="no-underline flex-1" passHref>
            <Button
              variant="outline"
              className="h-14 w-full p-2 flex items-center justify-between px-4 group"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                <span className="font-bold">Blog</span>
              </div>
              <ArrowRight className="h-6 w-6 transition-transform transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <h3>Get in touch</h3>
        <div className="flex justify-center gap-4 py-4">
          <Link
            className="no-underline flex-1"
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:patrick@pscoleman.me"
            passHref
          >
            <Button
              variant="outline"
              className="h-14 w-full p-2 flex items-center justify-between px-4 group"
            >
              <div className="flex items-center gap-2">
                <Mail className="h-6 w-6" />
                <span className="font-bold hidden md:inline">
                  patrick@pscoleman.me
                </span>
                <span className="font-bold inline md:hidden">Email</span>
              </div>
              <ArrowRight className="h-6 w-6 transition-transform transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="no-underline flex-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/patrickscoleman"
                  passHref
                >
                  <Button
                    variant="outline"
                    className="h-14 w-full p-2 flex items-center justify-start gap-2 px-4"
                  >
                    <LinkedIn className="h-6 w-6" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>LinkedIn</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="no-underline flex-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://x.com/patrickscoleman"
                  passHref
                >
                  <Button
                    variant="outline"
                    className="h-14 w-full p-2 flex items-center justify-start gap-2 px-4"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Twitter/X</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
        </div>
      </div>
      <div className="hidden md:block md:order-last md:col-span-2">
        <Image
          alt="Patrick Coleman"
          className="mx-auto rounded-full object-cover"
          style={{ boxShadow: `0 0px 3px var(--grid)` }}
          src="/images/patrick.png"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}

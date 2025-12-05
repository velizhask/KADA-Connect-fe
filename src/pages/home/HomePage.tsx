import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Building2,
  GraduationCap,
  Calendar,
  Star,
  ArrowRight,
  Users,
  Briefcase,
  Layers,
} from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { useState, useEffect } from "react";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";

import aseanlogo from "@/assets/logo/aseanlogo.png";
import ksalogo from "@/assets/logo/ksalogo.png";
import akcfLogo from "@/assets/logo/akcflogo.jpg";
import tuvnordLogo from "@/assets/logo/tuvnord.svg";
import kpnLogo from "@/assets/logo/kpn.png";
import eliceLogo from "@/assets/logo/eliceCI.svg";
import kimiaFarmLogo from "@/assets/logo/kimiafarm.png";
import nipaLogo from "@/assets/logo/nipa.png";
import komdigiLogo from "@/assets/logo/komdigi.png";
import { generateGoogleCalendarLink } from "@/utils/addToCalendar";

const testimonials = [
  {
    id: 1,
    name: "Qemhal Haritskhayru",
    role: "Elice Inc - Tech Business Development",
    about: "KADA Alumni Batch 1",
    rating: 5,
    text: "It was a great experience learning at KADA bootcamp. My first time learning about web development, and AI helpy really help me a lot on quickly understanding the concept. KADA also help me grow not just skill wise, but character. I met a lot of new professional and growth minded individuals that shares the same passion and dream.",
    avatarSrc: "/story/qemhal.png",
  },
  {
    id: 2,
    name: "Velizha Sandy Kusuma",
    role: "Full Stack Developer",
    about: "KADA Alumni Batch 1",
    rating: 5,
    text: "The Industry Visit event through KADA Connect was a game-changer. Met amazing companies and got multiple job offers!",
    avatarSrc: "/story/velizha.jpg",
  },
  {
    id: 3,
    name: "Dhruv Menghani",
    role: "Elice Inc - Developer",
    about: "KADA Alumni Batch 1",
    rating: 5,
    text: "It is amazing since I get to improve my skills (hard and soft skills), gain connections, and gain experience.",
    avatarSrc: "/story/dhruv.png",
  },
  {
    id: 4,
    name: "Samuel Junio Sambuaga",
    role: "Elice Inc - Tech Business Development",
    about: "KADA Alumni Batch 1",
    rating: 5,
    text: "Good and Fun Networking",
    avatarSrc: "/story/samuel.png",
  },
];

const industryVisitEvent = {
  title: "KADA Connect Industry Visit 2025",
  location: "Jakarta, Indonesia",
  description:
    "Join networking, company presentations, and one-on-one meetings with industry leaders.",
  startTime: "2025-11-12T09:00:00", // ISO format
  endTime: "2025-11-12T17:00:00",
};

const googleCalendarLink = generateGoogleCalendarLink(industryVisitEvent);

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const resume = () => setIsPaused(false);
    window.addEventListener("click", resume);
    return () => window.removeEventListener("click", resume);
  }, []);

  useEffect(() => {
    document.title = "KADA Connect";
  }, []);
  return (
    <MainLayout isFullWidth>
      {/* Hero Section - Simplified & More Focused */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28 text-gray-900">
        <div className="absolute inset-0 bg-grid-black/[0.03] bg-size-[20px_20px]" />
        <div className="container px-4 md:px-6 mx-auto max-w-5xl relative">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-sm font-medium border border-primary/20 text-primary">
                Industry Visit 2025
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
                Learn, connect, and grow at
                <span className="mx-2 text-primary bg-clip-text bg-linear-r from-primary to-primary/70">
                  KADA Connect
                </span>
              </h1>

              <p className=" max-w-1xl text-sm sm:text-xl text-gray-600">
                Empowering future talent and companies through the <br />
                Korea-ASEAN Digital Academy Industry Visit.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-2">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg transition-all duration-300 h-12 px-8"
              >
                <Link to="/companies">
                  <Building2 className="mr-2 h-5 w-5 transition-colors" />
                  Explore Companies
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg transition-all duration-300 h-12 px-8"
              >
                <Link to="/trainees">
                  <GraduationCap className="mr-2 h-5 w-5 transition-colors" />
                  Meet Trainees
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Redesigned with Icons */}
      <section className="py-16 bg-linear-to-b from-white to-gray-50 border-b">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <Building2 className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2">
                10+
              </div>
              <div className="text-sm font-medium text-gray-600">
                Guest Companies
              </div>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2">
                100+
              </div>
              <div className="text-sm font-medium text-gray-600">
                Talented Trainees
              </div>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2">
                100%
              </div>
              <div className="text-sm font-medium text-gray-600">
                Completion Rate
              </div>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <Layers className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2">
                10+
              </div>
              <div className="text-sm font-medium text-gray-600">
                Capstone Output
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Marquee - Enhanced */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <Marquee className="relative">
            <MarqueeFade side="left" />
            <MarqueeFade side="right" />

            <MarqueeContent>
              {[
                { src: aseanlogo, alt: "ASEAN" },
                { src: nipaLogo, alt: "NIPA" },
                { src: akcfLogo, alt: "AKCF" },
                { src: eliceLogo, alt: "Elice.io" },
                { src: komdigiLogo, alt: "Komdigi" },
                { src: ksalogo, alt: "KSA" },
                { src: tuvnordLogo, alt: "TUVNORD" },
                { src: kpnLogo, alt: "KPN CORP" },
                { src: kimiaFarmLogo, alt: "Kimia Farma" },
              ].map((logo, i) => (
                <MarqueeItem key={i} className="px-10">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-10 md:h-12 w-auto grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>
        </div>
      </section>
      {/* How It Works - Enhanced Cards */}
      <section className="py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              How KADA Connect Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to create meaningful professional connections
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 - Companies */}
            <Card className="flex flex-col justify-between p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Building2 className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="mb-3 text-xl font-medium">For Companies</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Browse talented KADA trainees, filter by tech stack and
                  skills, and explore detailed profiles with portfolios and CVs.
                </p>
              </div>

              <Link
                to="/companies"
                className="mt-auto inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-primary/80 hover-animate-arrow"
              >
                Browse Companies <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>

            {/* Card 2 - Trainees */}
            <Card className="flex flex-col justify-between p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <GraduationCap className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="mb-3 text-xl font-medium">For Trainees</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Discover visiting companies, learn about their mission and
                  values, and find career opportunities that match your
                  aspirations.
                </p>
              </div>

              <Link
                to="/trainees"
                className="mt-auto inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-primary/80 hover-animate-arrow"
              >
                View Trainees <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>

            {/* Card 3 - Save the Date */}
            <Card className="flex flex-col justify-between p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 group relative overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

              <div className="relative">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Calendar className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="mb-3 text-xl font-medium">
                  Industry Visit 2025
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Join us November 12, 2025 for networking, company
                  presentations, and one-on-one meetings with industry leaders.
                </p>
              </div>

              <a
                href={googleCalendarLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-primary/80 hover-animate-arrow"
              >
                Save to Google Calendar <ArrowRight className="h-4 w-4" />
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced with Navigation */}
      <section className="py-24 bg-linear-to-b from-gray-50 to-white">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              Real experiences from our community members
            </p>
          </div>

          <div className="relative px-2 sm:px-0">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full shrink-0 px-2 sm:px-4"
                  >
                    <Card className="p-6 sm:p-8 md:p-10 h-full">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-6 mb-6">
                        {/* Avatar + Text */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 flex-1">
                          {/* Avatar */}
                          <div className="w-24 h-24 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gray-200 shrink-0 mx-auto sm:mx-0">
                            <img
                              src={testimonial.avatarSrc}
                              alt={testimonial.name}
                              className="object-cover w-full h-full"
                            />
                          </div>

                          {/* Text */}
                          <div className="flex flex-col min-w-0 text-center sm:text-left">
                            <h4 className="font-semibold text-lg sm:text-xl text-gray-900">
                              {testimonial.name}
                            </h4>
                            <p className="text-base text-gray-600 font-medium">
                              {testimonial.role}
                            </p>
                            <p className="text-sm text-gray-500">
                              {testimonial.about}
                            </p>
                          </div>
                        </div>

                        {/* Stars (desktop right, mobile below) */}
                        <div className="flex gap-1  order-2 sm:order-0 justify-center sm:justify-end w-full sm:w-auto mt-3 sm:mt-0">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 sm:h-6 sm:w-6 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Testimonial text */}
                      <p className="text-gray-700 text-lg sm:text-xl leading-relaxed text-center sm:text-left">
                        "{testimonial.text}"
                      </p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                    setIsPaused(true);
                  }}
                  className={`h-2 sm:h-2.5 rounded-full transition-all cursor-pointer ${
                    index === currentIndex
                      ? "w-8 sm:w-10 bg-primary"
                      : "w-2 sm:w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Simplified */}
      <section className="bg-white py-24 border-t">
        <div className="container px-4 md:px-6 mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex  items-center justify-center mb-6">
              <img src={aseanlogo} alt="KADA Connect Logo" className="w-30" />
            </div>
            <h2 className="text-3xl md:text-4xl font-medium mb-6">
              About KADA Connect
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              KADA Connect bridges the gap between exceptional digital talent
              from Korea and ASEAN countries with innovative companies. We
              facilitate meaningful connections that drive careers forward and
              help businesses grow.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            <Card className="p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-all group">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                <Briefcase className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-medium text-xl mb-3">
                Comprehensive Profiles
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access detailed information about companies and trainees,
                including skills, portfolios, and career preferences
              </p>
            </Card>

            <Card className="p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-all group">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                <Building2 className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-medium text-xl mb-3">Smart Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced filtering by industry, tech stack, and preferences to
                find the perfect professional match
              </p>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;

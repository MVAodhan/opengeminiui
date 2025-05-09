"use client";

import { Button } from "@/components/ui/button";
import { supabaseClient as supabase } from "@/lib/supabase/client";
import { SupbaseUserResponse, UserInfo } from "@/lib/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createChat } from "./tools/chat-store";
import { redirect } from "next/navigation";

const Home = () => {
  const [user, setUser] = useState<UserInfo | null>(null);

  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    setUser(null);
    if (error) {
      console.log(error);
    }
  };

  const generateAndRedirect = async () => {
    const id = await createChat(); // create a new chat
    console.log(id);
    redirect(`/chat/${id}`);
  };

  const getUserCall = async () => {
    const {
      data: { user },
    } = (await supabase.auth.getUser()) as unknown as SupbaseUserResponse;

    if (user) {
      setUser(user);
    }
  };

  useEffect(() => {
    getUserCall();
  }, []);

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 min-h-screen font-sans text-gray-800">
      {/* Header */}

      <header className="container mx-auto px-6 lg:px-8 py-6 flex justify-between items-center  bg-white/80 backdrop-blur-md border-b border-gray-200/50 h-[100px]">
        <div className="flex items-center space-x-3">
          <Link href="/">
            <svg
              className="w-9 h-9 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              ></path>
            </svg>
          </Link>
          <span className="text-3xl font-bold text-gray-900 tracking-tight">
            Open Gemini UI
          </span>
        </div>
        <nav className="hidden md:flex gap-3 items-center">
          {!user && <Link href="/sign-in">Sign In</Link>}
          {user && (
            <div className="flex gap-3 items-center">
              <Button
                variant="ghost"
                onClick={generateAndRedirect}
                className="hover:text-indigo-600 "
              >
                Chat
              </Button>
              <Button
                variant="ghost"
                className="hover:text-indigo-600 "
                onClick={signOutUser}
              >
                Sign Out
              </Button>
            </div>
          )}
          <Link href="https://github.com/MVAodhan/opengeminiui" target="_blank">
            <Button variant="outline" className="hover:text-indigo-600 ">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </Button>
          </Link>
        </nav>
        <Button className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          <svg
            className="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </Button>
      </header>
      {/* Hero Section */}
      <main className="container mx-auto px-6 lg:px-8 pt-24 sm:pt-32 pb-32 sm:pb-40 text-center relative overflow-hidden">
        {/* Background decorative shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-radial from-indigo-200/50 via-transparent to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[30rem] h-[30rem] bg-gradient-radial from-blue-200/40 via-transparent to-transparent rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6 relative z-10">
          Build UIs with <span className="text-indigo-600">Generative AI</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 relative z-10">
          Transform your ideas into stunning, responsive user interfaces using
          natural language. Open source, community-driven, and built for modern
          development workflows.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 relative z-10">
          {/* <Link
            href="/sign-up"
            className="bg-indigo-600 text-white px-8 py-3.5 rounded-lg text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5"
          >
            Sign Up
          </Link> */}
          <Link
            href="https://github.com/MVAodhan/opengeminiui"
            target="_blank"
            className="bg-white text-gray-800 px-8 py-3.5 rounded-lg text-lg font-semibold border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 transition duration-200 ease-in-out shadow-sm hover:shadow-md flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>View on GitHub</span>
          </Link>
        </div>

        {/* Placeholder for App Screenshot/Demo */}
        {/* <div className="max-w-5xl mx-auto bg-gray-200 h-72 sm:h-96 md:h-[500px] rounded-xl shadow-2xl border border-gray-300 flex items-center justify-center text-gray-500 font-medium text-lg relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 opacity-50"></div>
          <span className="relative z-10">
            [ Interactive App Demo Placeholder ]
          </span>
        </div> */}
      </main>

      {/* Features Section */}
      <section id="features" className="bg-white py-28 sm:py-36">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              How it Works
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Generate UIs, just by chatting to Google Gemini
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              GenUI simplifies UI development by translating your descriptions
              into code, accelerating your workflow from concept to deployment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {/* Feature 1 */}
            <div className="text-center p-8 border border-gray-200/80 rounded-xl shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 ease-in-out bg-white">
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center ring-8 ring-indigo-50">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Instant Prototyping
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Describe the component or layout you envision, and watch GenUI
                generate interactive previews in real-time.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="text-center p-8 border border-gray-200/80 rounded-xl shadow-sm hover:shadow-lg hover:border-teal-200 transition-all duration-300 ease-in-out bg-white">
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center ring-8 ring-teal-50">
                  <svg
                    className="w-8 h-8 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    ></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                React & Tailwind
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get a single React component, with Tailwind CSS, to start
                creating and shipfaster
              </p>
            </div>
            {/* Feature 3 */}
            <div className="text-center p-8 border border-gray-200/80 rounded-xl shadow-sm hover:shadow-lg hover:border-purple-200 transition-all duration-300 ease-in-out bg-white">
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center ring-8 ring-purple-50">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Community Powered
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Contribute, Fork, Deploy and Customise. GenUI is for developers,
                by developers and completely free for you to use how you like.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community/CTA Section */}
      <section
        id="community"
        className="bg-gradient-to-b from-indigo-100 via-blue-50 to-white py-28 sm:py-36"
      >
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Ready to Revolutionize Your Workflow?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Join thousands of developers and designers using GenUI. Contribute
            to the open-source project, share your creations, and shape the
            future of UI development.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/sign-up"
              className="bg-indigo-600 text-white px-8 py-3.5 rounded-lg text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5"
            >
              Try GenUI Now
            </Link>
            <Link
              href="https://github.com/MVAodhan/opengeminiui"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-8 py-3.5 rounded-lg text-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200 ease-in-out shadow-md hover:shadow-gray-600/40 inline-flex items-center space-x-2.5"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span>Explore the Code</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 sm:py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <svg
                className="w-8 h-8 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                ></path>
              </svg>
              <span className="text-xl font-semibold text-gray-200">GenUI</span>
            </div>
            <div className="flex space-x-6 mb-6 md:mb-0">
              <Link
                href="https://github.com/MVAodhan/opengeminiui"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition duration-200 ease-in-out text-sm"
              >
                GitHub
              </Link>
            </div>
            <div className="flex space-x-6">
              {/* Placeholder for social icons */}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700/50 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()}
              Released under the MIT License.
            </p>
            <div className="mt-4 space-x-6">
              <a
                href="#"
                className="hover:text-gray-200 transition duration-150 ease-in-out"
              >
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="#"
                className="hover:text-gray-200 transition duration-150 ease-in-out"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

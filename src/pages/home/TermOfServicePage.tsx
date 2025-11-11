import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FileText } from "lucide-react";

// Import markdown content from TypeScript files
import { termsOfService } from "@/assets/docs/terms-of-service";
import { privacyPolicy } from "@/assets/docs/privacy-policy";

const KadaTermsOfService = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">(
    tabParam === "privacy" || tabParam === "terms" ? tabParam : "terms"
  );
  const [content, setContent] = useState<string>("");

  // Load content when tab changes
  useEffect(() => {
    if (activeTab === "terms") {
      setContent(termsOfService);
    } else if (activeTab === "privacy") {
      setContent(privacyPolicy);
    }
  }, [activeTab]);

  // Update tab from URL parameter
  useEffect(() => {
    if (tabParam === "privacy" || tabParam === "terms") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: "terms" | "privacy") => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Simple markdown to HTML converter
  const parseMarkdown = (markdown: string): string => {
    if (!markdown) return "";

    let html = markdown;

    // Headers
    html = html.replace(
      /^### (.*$)/gim,
      '<h3 class="text-xl font-semibold text-gray-900 mb-4 mt-6">$1</h3>'
    );
    html = html.replace(
      /^## (.*$)/gim,
      '<h2 class="text-2xl font-bold text-gray-900 mb-6 mt-8">$1</h2>'
    );
    html = html.replace(
      /^# (.*$)/gim,
      '<h1 class="text-3xl font-bold text-gray-900 mb-6">$1</h1>'
    );

    // Bold
    html = html.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-semibold">$1</strong>'
    );

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Line breaks and paragraphs
    html = html
      .split("\n\n")
      .map((para: string) => {
        if (
          para.trim().startsWith("<h") ||
          para.trim().startsWith("<ul") ||
          para.trim().startsWith("<ol")
        ) {
          return para;
        }
        return `<p class="text-gray-700 leading-relaxed mb-4">${para.replace(
          /\n/g,
          "<br>"
        )}</p>`;
      })
      .join("\n");

    // Ordered lists
    html = html.replace(
      /^\d+\.\s+(.+)$/gim,
      '<li class="text-gray-700 mb-2 ml-6">$1</li>'
    );
    html = html.replace(
      /(<li class="text-gray-700 mb-2 ml-6">.*<\/li>\n?)+/g,
      '<ol class="list-decimal list-inside space-y-2 mb-4">$&</ol>'
    );

    // Unordered lists
    html = html.replace(
      /^[-*]\s+(.+)$/gim,
      '<li class="text-gray-700 mb-2 ml-6">$1</li>'
    );
    html = html.replace(
      /(<li class="text-gray-700 mb-2 ml-6">.*<\/li>\n?)+/g,
      '<ul class="list-disc list-inside space-y-2 mb-4">$&</ul>'
    );

    return html;
  };

    useEffect(() => {
  if (activeTab === "terms") {
    document.title = "KADA Connect | Terms of Service";
  } else if (activeTab === "privacy") {
    document.title = "KADA Connect | Privacy Policy";
  }
}, [activeTab]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 md:mb-8">
          KADA Connect Terms of Service
        </h1>

        {/* Tabs */}
        <div className="flex gap-4 sm:gap-6 border-b border-gray-200 mb-6 md:mb-8">
          <button
            onClick={() => handleTabChange("terms")}
            className={`pb-3 px-1 font-medium transition-colors text-sm sm:text-base ${
              activeTab === "terms"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => handleTabChange("privacy")}
            className={`pb-3 px-1 font-medium transition-colors text-sm sm:text-base ${
              activeTab === "privacy"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {/* Content */}
        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
          {content ? (
            <div
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-gray-700 mb-2">No content available</p>
              <p className="text-sm text-gray-600">
                Please add content files to assets/docs folder
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KadaTermsOfService;

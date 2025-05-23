import React, { useEffect, useState } from "react";
import Link from "next/link";

const CURRENT_VERSION = "1.2.1"; // Replace with the actual current version

const ChangeLog = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the popup has been shown for the current version
    const versionShown = localStorage.getItem("version");
    if (versionShown !== CURRENT_VERSION) {
      setShowPopup(true);

      // Mark the popup as shown for the current version
      localStorage.setItem("version", CURRENT_VERSION);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-secondary/95 to-secondary/85 backdrop-blur-xl rounded-xl shadow-2xl max-w-md w-full  border-action border-t-2 transform transition-all animate-fadeIn">
        <div className="relative p-5">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-5xl animood text-white mb-1">Animood</h2>
            <div className="inline-block px-3 py-1 bg-action/20 rounded-full text-sm font-medium text-action">
              v{CURRENT_VERSION}
            </div>
          </div>

          {/* Note */}
          <div className="bg-black/20 rounded-lg p-3 mb-4 text-gray-300 text-sm">
            I kind of forgot to update the project for a while but rest assured
            a lot of good changes are coming soon, for now I have fixed the AI
            backend that was causing a lot of issues, more changes to follow in
            following weeks.
          </div>

          {/* Changelog Section */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <div className="h-px bg-gray-600 flex-grow"></div>
              <h3 className="mx-3 text-gray-200 font-medium">
                What&apos;s New
              </h3>
              <div className="h-px bg-gray-600 flex-grow"></div>
            </div>

            <ul className="space-y-2 text-gray-300 text-sm pl-2">
              <li className="flex items-start">
                <span className="text-action mr-2">•</span>
                <span>
                  Migrated AI backend from GPT-4 Turbo to Cloudflare Worker AI
                  for more accurate and helpful responses
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-action mr-2">•</span>
                <span>Better mood selection on home page.</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <button
            className="w-full py-2.5 bg-action hover:bg-action/80 transition-colors text-white font-medium rounded-md mb-3"
            onClick={handleClose}
          >
            Got it!
          </button>

          {/* Footer */}
          <div className="text-gray-400 text-xs text-center">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/LiReNa00"
              target="_blank"
              rel="noopener noreferrer"
              className="text-action hover:underline"
            >
              Lirena
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeLog;

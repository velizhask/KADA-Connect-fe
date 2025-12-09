import { Button } from "@/components/ui/button";

export default function PrivacyPolicyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-6 z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 space-y-4 shadow-xl">
        <h2 className="text-2xl font-bold">KADA Connect Privacy Policy</h2>

        {/* SCROLL AREA */}
        <div className="h-96 overflow-y-auto border p-4 rounded space-y-4 text-gray-700 leading-relaxed">

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            KADA Connect - Privacy Policy (Development Stage)
          </h2>

          <p>
            <strong>Effective Date:</strong> November 2025<br />
            <strong>Entity:</strong> Elice APAC Pte. Ltd. (Subsidiary of Elice Inc., Republic of Korea)<br />
            <strong>Applicable Regions:</strong> Indonesia, Singapore, Republic of Korea
          </p>

          <hr className="border-gray-300 my-4" />

          {/* ————— 1. OVERVIEW ————— */}
          <h4 className="text-xl font-semibold text-gray-900">1. Overview</h4>
          <p>
            KADA Connect is a development-stage web platform under <strong>Elice APAC Pte. Ltd.</strong>,
            a Singapore-based subsidiary of <strong>Elice Inc. (Republic of Korea)</strong>, designed
            to support professional networking between <strong>KADA trainees</strong> and
            <strong> partner companies</strong> in ASEAN.
          </p>

          <p>
            This Privacy Policy outlines how KADA Connect processes, stores, and safeguards user
            and institutional data during its <strong>development and pre-launch phase</strong>,
            in compliance with:
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>Indonesia’s Personal Data Protection Law (UU No. 27/2022)</li>
            <li>Singapore’s Personal Data Protection Act (PDPA)</li>
            <li>Republic of Korea’s Personal Information Protection Act (PIPA)</li>
            <li>General Data Protection Regulation (GDPR)</li>
          </ul>

          {/* ————— 2. SCOPE ————— */}
          <h4 className="text-xl font-semibold text-gray-900">2. Scope of Application</h4>
          <p>
            This policy applies to data handled through the <strong>KADA Connect microsite</strong>{" "}
            (<a href="https://kada-connect.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              https://kada-connect.vercel.app
            </a>)
            and its upcoming deployment on <strong>git.elicer.io</strong>.
          </p>

          <p>
            During this development and Industry Visit phase, the microsite is publicly accessible
            without login. Certain trainee and company data are visible for{" "}
            <strong>showcase, evaluation, and professional networking</strong>.
          </p>

          {/* ————— 3. PURPOSE ————— */}
          <h4 className="text-xl font-semibold text-gray-900">3. Purpose of Data Processing</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>To display and match trainee profiles with company data.</li>
            <li>To demonstrate platform capabilities during the Industry Visit.</li>
            <li>To support data-driven educational strategies.</li>
            <li>To enhance usability for future releases.</li>
          </ul>

          <p>
            All personal data remains within educational and program scope —
            <strong> not for marketing or resale</strong>.
          </p>

          {/* ————— 4. CATEGORIES ————— */}
          <h4 className="text-xl font-semibold text-gray-900">4. Categories of Personal Information</h4>

          <table className="min-w-full text-left border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border-b">Category</th>
                <th className="px-4 py-2 border-b">Description</th>
                <th className="px-4 py-2 border-b">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b font-medium">Trainee Data</td>
                <td className="px-4 py-2 border-b">General profiles</td>
                <td className="px-4 py-2 border-b">Name, cohort, major</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b font-medium">Company Data</td>
                <td className="px-4 py-2 border-b">Company profiles</td>
                <td className="px-4 py-2 border-b">Logo, industry</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b font-medium">Uploaded Media</td>
                <td className="px-4 py-2 border-b">Imported media</td>
                <td className="px-4 py-2 border-b">Photos, logos</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b font-medium">System Data</td>
                <td className="px-4 py-2 border-b">Debug logs</td>
                <td className="px-4 py-2 border-b">Timestamps</td>
              </tr>
            </tbody>
          </table>

          {/* ————— 5. RETENTION ————— */}
          <h4 className="text-xl font-semibold text-gray-900">5. Data Retention</h4>
          <p>
            All KADA Connect data are stored through <strong>Supabase</strong> and{" "}
            <strong>Elice GitLab Cloud Infrastructure</strong>.
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>Retention until the end of KADA Batch 2 program.</li>
            <li>Retained for internal evaluation and development.</li>
            <li>Data deletion requests accepted after program completion.</li>
          </ul>

          {/* ————— 6. HOSTING ————— */}
          <h4 className="text-xl font-semibold text-gray-900">6. Hosting and Deployment</h4>

          <table className="min-w-full text-left border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border-b">Environment</th>
                <th className="px-4 py-2 border-b">Platform</th>
                <th className="px-4 py-2 border-b">Region</th>
                <th className="px-4 py-2 border-b">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b">Frontend</td>
                <td className="px-4 py-2 border-b">GitLab Pages</td>
                <td className="px-4 py-2 border-b">Singapore</td>
                <td className="px-4 py-2 border-b">Web hosting</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">Backend</td>
                <td className="px-4 py-2 border-b">Render (temporary)</td>
                <td className="px-4 py-2 border-b">-</td>
                <td className="px-4 py-2 border-b">API logic</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">Database</td>
                <td className="px-4 py-2 border-b">Supabase</td>
                <td className="px-4 py-2 border-b">Singapore</td>
                <td className="px-4 py-2 border-b">Storage</td>
              </tr>
            </tbody>
          </table>

          {/* ————— 7–13 ————— */}
          {/* Shortened for readability but still same content */}
          <h4 className="text-xl font-semibold text-gray-900">7. Public Visibility</h4>
          <p>Some trainee and company data are publicly visible for demo purposes.</p>

          <h4 className="text-xl font-semibold text-gray-900">8. Security Measures</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>SSL/TLS encryption</li>
            <li>API access control</li>
            <li>File validation</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900">9. Third-Party Services</h4>
          <p>Supabase, Google Cloud, Render, GitLab.</p>

          <h4 className="text-xl font-semibold text-gray-900">10. User Rights</h4>
          <p>
            Users may request data correction or deletion after program completion.
            Contact:
          </p>
          <ul className="space-y-1">
            <li>
              📩{" "}
              <a href="mailto:kada.id@elice.io" className="text-blue-600 underline">
                kada.id@elice.io
              </a>
            </li>
            <li>
              📩{" "}
              <a href="mailto:security@elicer.com" className="text-blue-600 underline">
                security@elicer.com
              </a>
            </li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900">11. Data Controller</h4>
          <p>Elice APAC Pte. Ltd., Singapore.</p>

          <h4 className="text-xl font-semibold text-gray-900">12. Future Updates</h4>
          <p>This policy will be updated as the platform evolves.</p>

          <h4 className="text-xl font-semibold text-gray-900">13. Disclaimer</h4>
          <p>KADA Connect is used for educational and networking purposes only.</p>

          <hr className="border-gray-300 my-4" />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>Close</Button>
          <Button onClick={onClose}>Agree</Button>
        </div>
      </div>
    </div>
  );
}

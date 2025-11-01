import { useState } from "react";
import toast from "react-hot-toast";
import { useDataManagement } from "../hooks/useData";

export default function DataManager({ onClose }: { onClose: () => void }) {
  const { exportData, downloadBackup, uploadBackup, resetData } = useDataManagement();
  const [showExport, setShowExport] = useState(false);
  const [exportedData, setExportedData] = useState("");

  const handleExport = () => {
    const data = exportData();
    setExportedData(data);
    setShowExport(true);
    toast.success("Data exported!");
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(exportedData);
    toast.success("Copied to clipboard!");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadBackup(file).then((success) => {
        if (success) {
          toast.success("Data imported successfully!");
        } else {
          toast.error("Failed to import data");
        }
      });
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all data to defaults? This cannot be undone.")) {
      resetData();
      toast.success("Data reset to defaults");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Data Management</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-100">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Export Section */}
          <div className="rounded-lg bg-neutral-800/50 p-4">
            <h3 className="font-semibold mb-2">Export Data</h3>
            <p className="text-sm text-neutral-400 mb-3">
              Export all your data as JSON for backup or sharing
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="rounded bg-blue-600 hover:bg-blue-500 px-4 py-2"
              >
                View JSON
              </button>
              <button
                onClick={downloadBackup}
                className="rounded bg-emerald-600 hover:bg-emerald-500 px-4 py-2"
              >
                Download Backup
              </button>
            </div>
            {showExport && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-400">Exported JSON:</span>
                  <button
                    onClick={handleCopyToClipboard}
                    className="text-xs rounded bg-neutral-700 hover:bg-neutral-600 px-2 py-1"
                  >
                    Copy
                  </button>
                </div>
                <textarea
                  readOnly
                  value={exportedData}
                  className="w-full h-48 bg-neutral-950 rounded p-3 text-xs font-mono"
                />
              </div>
            )}
          </div>

          {/* Import Section */}
          <div className="rounded-lg bg-neutral-800/50 p-4">
            <h3 className="font-semibold mb-2">Import Data</h3>
            <p className="text-sm text-neutral-400 mb-3">
              Import data from a JSON backup file
            </p>
            <label className="block">
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="inline-block rounded bg-purple-600 hover:bg-purple-500 px-4 py-2 cursor-pointer">
                Choose File
              </span>
            </label>
          </div>

          {/* Reset Section */}
          <div className="rounded-lg bg-neutral-800/50 p-4">
            <h3 className="font-semibold mb-2">Reset Data</h3>
            <p className="text-sm text-neutral-400 mb-3">
              Reset all data to default demo content
            </p>
            <button
              onClick={handleReset}
              className="rounded bg-red-600 hover:bg-red-500 px-4 py-2"
            >
              Reset to Defaults
            </button>
          </div>

          {/* Instructions */}
          <div className="rounded-lg bg-neutral-800/50 p-4">
            <h3 className="font-semibold mb-2">Data Storage</h3>
            <p className="text-sm text-neutral-400">
              All data is stored in your browser's localStorage. Your data persists across sessions
              but is local to this browser. Use export/import to transfer data between browsers or
              create backups.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

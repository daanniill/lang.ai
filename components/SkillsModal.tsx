import { useState, useEffect } from "react";

export default function SkillModal({
    skillLevel,
    strengths,
    weaknesses,
    userLanguage,
    setSkillLevel,
    setStrengths,
    setWeaknesses,
    setLanguage,
    onClose,
    onSubmit,
}) {
    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            skillLevel,
            strengths,
            weaknesses,
            userLanguage,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-slate-800 p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Please Complete Your Skills</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-300">Skill Level</label>
                        <input
                            type="text"
                            value={skillLevel}
                            onChange={(e) => setSkillLevel(e.target.value)}
                            className="w-full p-2 mt-2 bg-slate-700 text-white rounded"
                            placeholder="Enter your skill level"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300">Strengths</label>
                        <textarea
                            value={strengths}
                            onChange={(e) => setStrengths(e.target.value)}  // Update in the parent page (dcashboard)
                            className="w-full p-2 mt-2 bg-slate-700 text-white rounded"
                            placeholder="Enter your strengths"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300">Weaknesses</label>
                        <textarea
                            value={weaknesses}
                            onChange={(e) => setWeaknesses(e.target.value)}  // update parent also
                            className="w-full p-2 mt-2 bg-slate-700 text-white rounded"
                            placeholder="Enter your weaknesses"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-300">Language</label>
                        <textarea
                            value={userLanguage}
                            onChange={(e) => setLanguage(e.target.value)}  // update parent also
                            className="w-full p-2 mt-2 bg-slate-700 text-white rounded"
                            placeholder="Target Language"
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-sm text-slate-400 hover:text-red-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


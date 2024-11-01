import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface Sample {
  name: string;
  category: string;
  bpm: number;
  key: string;
  duration: string;
  url: string;
}

function SampleManager() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);

  const sampleData: Sample[] = [
    {
      name: "Deep House Bass",
      category: "Bass",
      bpm: 124,
      key: "C",
      duration: "0:32",
      url: "#"
    },
    {
      name: "Analog Drum Loop",
      category: "Drums",
      bpm: 128,
      key: "Am",
      duration: "0:16",
      url: "#"
    },
    // Add more sample data as needed
  ];

  const handlePlayPause = (sampleName: string) => {
    if (playing === sampleName) {
      setPlaying(null);
    } else {
      setPlaying(sampleName);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Sample Library</h2>
        <button
          onClick={() => setMuted(!muted)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      <div className="grid gap-4">
        {sampleData.map((sample) => (
          <div
            key={sample.name}
            className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handlePlayPause(sample.name)}
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
              >
                {playing === sample.name ? (
                  <Pause size={20} />
                ) : (
                  <Play size={20} />
                )}
              </button>
              <div>
                <h3 className="font-medium">{sample.name}</h3>
                <div className="flex space-x-2 text-sm text-gray-500">
                  <span>{sample.category}</span>
                  <span>•</span>
                  <span>{sample.bpm} BPM</span>
                  <span>•</span>
                  <span>Key: {sample.key}</span>
                  <span>•</span>
                  <span>{sample.duration}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="w-24 h-12 bg-gray-100 rounded">
                {/* Waveform visualization would go here */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SampleManager;
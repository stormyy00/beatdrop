"use client";

import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Pause, Upload } from "lucide-react";
import { Input } from "../ui/input";


const AudioTrimmer = () => {
   const containerRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const regions = useRef<any>(null);
  const regionRef = useRef<any>(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [clipTimes, setClipTimes] = useState({ start: 0, end: 0 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
       waveColor: "#dbeafe", // light blue-100
      progressColor: "#3b82f6", // blue-500
      cursorColor: "#2563eb", // blue-600
      barWidth: 2,
      height: 120,
      responsive: true,
      normalize: true,
    });

    const reg = ws.registerPlugin(RegionsPlugin.create());
    regions.current = reg;

    ws.on("ready", () => {
      setIsReady(true);
      const duration = ws.getDuration();
      const end = Math.min(15, duration);
      const region = reg.addRegion({
        start: 0,
        end,
        color: "rgba(59,130,246,0.25)",
        drag: true,
        resize: true,
      });
      regionRef.current = region;
      setClipTimes({ start: 0, end });
    });

    reg.on("region-updated", (region: any) => {
      setClipTimes({
        start: parseFloat(region.start.toFixed(2)),
        end: parseFloat(region.end.toFixed(2)),
      });
    });

    ws.on("finish", () => setIsPlaying(false));
    wavesurfer.current = ws;

    // load default sample
    setIsLoading(true);
    ws.load("/sample.mp3").then(() => {
      setIsLoading(false);
      setFileName("sample.mp3");
    });

    return () => ws.destroy();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFileName(file.name);
    setIsLoading(true);
    setIsReady(false);
    setIsPlaying(false);
    regions.current?.clearRegions();
    wavesurfer.current?.load(url).then(() => setIsLoading(false));
  };

  const togglePlay = () => {
    if (!wavesurfer.current || !regionRef.current) return;
    const { start, end } = regionRef.current;
    if (isPlaying) {
      wavesurfer.current.pause();
      setIsPlaying(false);
    } else {
      wavesurfer.current.play(start, end);
      setIsPlaying(true);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto rounded-xl border-none shadow-none border-gray-200 py-0">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">SoundClip Editor</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Trim and preview audio clips
          </CardDescription>
        </div>

        <label className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-md px-3 py-1.5 text-sm cursor-pointer transition">
          <Upload size={14} className="text-gray-600" />
          <span className="text-gray-700 font-medium">Import</span>
          <Input type="file" accept="audio/*" onChange={handleFileUpload} hidden />
        </label>
      </CardHeader>

      <CardContent className="space-y-4">
        {fileName && (
          <p className="text-xs text-gray-500">
            Loaded: <span className="font-medium">{fileName}</span>
          </p>
        )}

        <div
          ref={containerRef}
          className="relative w-full rounded-md overflow-hidden border border-gray-100"
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
              <Skeleton className="w-full h-[120px]" />
              <p className="absolute text-sm text-gray-500">Loading audio...</p>
            </div>
          )}
        </div>

        {/* Timestamp overlay */}
        {isReady && (
          <div className="flex justify-between text-xs text-gray-600">
            <span>
              Start:{" "}
              <span className="font-medium">{clipTimes.start.toFixed(2)}s</span>
            </span>
            <span>
              End:{" "}
              <span className="font-medium">{clipTimes.end.toFixed(2)}s</span>
            </span>
            <span>
              Length:{" "}
              <span className="font-medium">
                {(clipTimes.end - clipTimes.start).toFixed(2)}s
              </span>
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-center pb-5">
        {isReady && !isLoading ? (
          <Button
            onClick={togglePlay}
            className="rounded-full px-4 flex items-center gap-2"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? "Pause" : "Play Clip"}
          </Button>
        ) : (
          <p className="text-sm text-gray-400">Preparing waveform...</p>
        )}
      </CardFooter>
    </Card>
  );
}

export default AudioTrimmer;
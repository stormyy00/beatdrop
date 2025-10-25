"use client";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Play, Pause, Heart, Bookmark, Share } from "lucide-react";
import { useState } from "react";

const MusicPostCard = ({
  id,
  user,
  artist,
  track,
  source,
  caption,
  likes,
  clipLength,
  timeRange,
  timeAgo,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlay = () => setIsPlaying((prev) => !prev);

  return (
    <Card className="w-full max-w-md mx-auto border-b border-gray-100 rounded-none shadow-none bg-white hover:bg-gray-50/60 transition-colors">
      {/* Header */}
      <CardHeader className="flex items-start gap-2 p-3 pb-1">
        <Avatar className="h-7 w-7">
          <AvatarImage src="https://i.pravatar.cc/100?u=user" alt="User" />
          <AvatarFallback>JT</AvatarFallback>
        </Avatar>
        <div className="flex flex-col leading-tight w-full">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-gray-900">{user.name}</p>
            <p className="text-[11px] text-gray-500">{timeAgo}</p>
          </div>
          {caption && (
            <p className="text-[13px] text-gray-800 mt-0.5 leading-snug">
              {caption}
            </p>
          )}
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="px-3 pb-1 space-y-1">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[13px] font-semibold text-gray-900 leading-tight">
              {track}
            </p>
            <p className="text-[11px] text-gray-500 leading-tight">{artist}</p>
          </div>
          <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-md font-medium">
            {source}
          </span>
        </div>

        {/* Waveform */}
        <div className="relative w-full h-6 bg-gray-100 rounded-md overflow-hidden mt-1">
          <div className="absolute inset-0 flex items-end justify-between px-[1px]">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="w-[2%] bg-gray-400 rounded-sm"
                style={{
                  height: `${Math.random() * 45 + 15}%`,
                  opacity: i % 2 === 0 ? 0.8 : 0.4,
                }}
              />
            ))}
          </div>
          <div
            className="absolute top-0 left-0 h-full bg-blue-300/40 transition-all duration-500"
            style={{ width: isPlaying ? "70%" : "0%" }}
          />
        </div>

        <div className="flex justify-center pt-1">
          <Button
            onClick={togglePlay}
            size="icon"
            variant="ghost"
            className="rounded-full border border-gray-200 h-7 w-7 hover:bg-gray-100"
          >
            {isPlaying ? (
              <Pause className="h-3.5 w-3.5 text-gray-800" />
            ) : (
              <Play className="h-3.5 w-3.5 text-gray-800" />
            )}
          </Button>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between items-center px-3 py-2 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors">
            <Heart className="h-3.5 w-3.5" />
            <span className="text-[12px]">{likes}</span>
          </button>
           <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors">
            <Share className="h-3.5 w-3.5" />
            <span className="text-[12px]">{likes}</span>
          </button>
          <button className="flex items-center gap-1 text-gray-600 hover:text-yellow-500 transition-colors">
            <Bookmark className="h-3.5 w-3.5" />
          </button>
        </div>
        <span className="text-[10.5px] text-gray-400">
          {clipLength} • {timeRange}
        </span>
      </CardFooter>
    </Card>
  );
};

export default MusicPostCard;

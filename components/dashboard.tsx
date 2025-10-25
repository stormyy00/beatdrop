import React from "react";
import MusicPostCard from "./postcard";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 p-6">
      {mockPosts.map(
        (
          {
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
          },
          index
        ) => (
          <MusicPostCard
            key={index}
            id={id}
            user={user}
            artist={artist}
            track={track}
            source={source}
            caption={caption}
            likes={likes}
            clipLength={clipLength}
            timeRange={timeRange}
            timeAgo={timeAgo}
          />
        )
      )}
    </div>
  );
};

export default Dashboard;

export const mockPosts = [
  {
    id: 1,
    user: {
      name: "Jonathan Trujillo",
      avatar: "https://i.pravatar.cc/100?u=jonathan",
    },
    artist: "ISOxo",
    track: "Radial",
    source: "Spotify",
    caption: "ISO never misses. This drop’s unreal 🔥",
    likes: 238,
    clipLength: "20s",
    timeRange: "1:10–1:30",
    timeAgo: "1h ago",
  },
  {
    id: 2,
    user: {
      name: "Liam Ortega",
      avatar: "https://i.pravatar.cc/100?u=liam",
    },
    artist: "Knock2",
    track: "Make U SWEAT!",
    source: "SoundCloud",
    caption: "If the festival had a sound, it’s this 😤",
    likes: 410,
    clipLength: "15s",
    timeRange: "0:45–1:00",
    timeAgo: "3h ago",
  },
  {
    id: 3,
    user: {
      name: "Maya Flores",
      avatar: "https://i.pravatar.cc/100?u=maya",
    },
    artist: "Radiohead",
    track: "Everything In Its Right Place",
    source: "Spotify",
    caption: "Timeless and haunting — late night energy 🌙",
    likes: 189,
    clipLength: "25s",
    timeRange: "0:15–0:40",
    timeAgo: "5h ago",
  },
  {
    id: 4,
    user: {
      name: "Noah Kim",
      avatar: "https://i.pravatar.cc/100?u=noah",
    },
    artist: "Baby Keem",
    track: "16",
    source: "Spotify",
    caption: "This track just *flows*. Keem different 💫",
    likes: 342,
    clipLength: "18s",
    timeRange: "0:35–0:53",
    timeAgo: "8h ago",
  },
  {
    id: 5,
    user: {
      name: "Ava Nguyen",
      avatar: "https://i.pravatar.cc/100?u=ava",
    },
    artist: "Kaytranada",
    track: "Lite Spots",
    source: "SoundCloud",
    caption: "Summer groove on repeat ☀️🪩",
    likes: 521,
    clipLength: "20s",
    timeRange: "0:55–1:15",
    timeAgo: "10h ago",
  },
];

import {
  Users,
  Link,
  Mail,
  Users2,
  Clock,
  ChartArea,
  PictureInPicture,
  User2,
  Building2,
  Home,
} from "lucide-react";
import { JSX } from "react";

interface Tab {
  name: string;
  link: string;
  icon: JSX.Element;
  subtabs?: Tab[];
}

interface Section {
  label: string;
  tabs: Tab[];
}

interface Collapsible {
  expand: boolean;
  sections: Section[];
}

type Tabs = Record<string, Collapsible>;


export const TABS: Tabs = {
    "": {
      expand: true,
      sections: [
        {
          label: "Main",
          tabs: [
            {
              name: "Dashboard",
              link: `/dashboard`,
                icon: <Home />,
            },
            {
              name: "Chat",
              link: `/dashboard/chat`,
              icon: <Mail />,
            },
            {
              name: "Posts",
              link: `/dashboard/posts`,
              icon: <PictureInPicture />,
            },
            {
              name: "Messages",
              link: `/dashboard/messages`,
              icon: <Clock />,
            },
          ],
        },
      ],
    },
  };


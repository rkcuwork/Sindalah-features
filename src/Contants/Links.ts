import { paths } from "@/lib/HelperFunctions/Path";


export const sidebarLinks = [
    {
      imgURL: `${paths.base}/assets/icons/home.svg`,
      route: `${paths.main}`,
      label: "Home",
    },
    {
      imgURL: `${paths.base}/assets/icons/wallpaper.svg`,
      route: `${paths.base}/explore`,
      label: "Explore",
    },
    {
      imgURL: `${paths.base}/assets/icons/people.svg`,
      route: `${paths.base}/all-users`,
      label: "People",
    },
    {
      imgURL: `${paths.base}/assets/icons/bookmark.svg`,
      route: `${paths.base}/saved`,
      label: "Saved",
    },
    {
      imgURL: `${paths.base}/assets/icons/gallery-add.svg`,
      route: `${paths.base}/create-post`,
      label: "Create Post",
    },
  ];
  
  export const bottombarLinks = [
    {
      imgURL: `${paths.base}/assets/icons/home.svg`,
      route: `${paths.base}/`,
      label: "Home",
    },
    {
      imgURL: `${paths.base}/assets/icons/wallpaper.svg`,
      route: `${paths.base}/explore`,
      label: "Explore",
    },
    {
      imgURL: `${paths.base}/assets/icons/bookmark.svg`,
      route: `${paths.base}/saved`,
      label: "Saved",
    },
    {
      imgURL: `${paths.base}/assets/icons/gallery-add.svg`,
      route: `${paths.base}/create-post`,
      label: "Create",
    },
  ];
  
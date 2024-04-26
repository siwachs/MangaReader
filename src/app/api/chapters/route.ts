import { NextResponse, NextRequest } from "next/server";

const chapters = [
  {
    _id: "1",
    title: "Chapter 1",
    releaseDate: "2022-04-19",
    noOfLike: 849,
    noOfComments: 923,
  },
  {
    _id: "2",
    title: "Chapter 2",
    releaseDate: "2022-04-19",
    noOfLike: 849,
    noOfComments: 923,
  },
  {
    _id: "3",
    title: "Chapter 3",
    releaseDate: "2022-04-19",
    noOfLike: 849,
    noOfComments: 923,
  },
  {
    _id: "4",
    title: "Chapter 4",
    releaseDate: "2022-04-19",
    noOfLike: 849,
    noOfComments: 923,
  },
  {
    _id: "5",
    title: "Chapter 5",
    releaseDate: "2022-04-19",
    noOfLike: 849,
    noOfComments: 923,
  },
  {
    _id: "6",
    title: "Chapter 6",
    releaseDate: "2022-04-19",
    noOfLike: 849,
    noOfComments: 923,
  },
  {
    _id: "7",
    title: "Chapter 7",
    releaseDate: "2022-04-19",
    noOfLike: 849,
    noOfComments: 923,
  },
  {
    _id: "8",
    title: "Chapter 8",
    releaseDate: "2022-04-19",
    noOfLike: 849,
    noOfComments: 923,
  },
  {
    _id: "9",
    title: "Chapter 9",
    releaseDate: "2022-04-19",
    noOfLike: 849,
    noOfComments: 923,
  },
  {
    _id: "10",
    title: "Chapter 10",
    releaseDate: "2022-04-19",
    noOfLike: 849,
    noOfComments: 923,
  },
  {
    _id: "11",
    title: "Chapter 11",
    releaseDate: "2022-04-19",
    noOfLike: 849,
    noOfComments: 923,
  },
  {
    _id: "12",
    title: "Chapter 12",
    releaseDate: "2022-04-19",
    noOfLike: 849,
    noOfComments: 923,
  },
  {
    _id: "13",
    title: "Chapter 13",
    releaseDate: "2022-04-26",
    noOfLike: 890,
    noOfComments: 950,
  },
  {
    _id: "14",
    title: "Chapter 14",
    releaseDate: "2022-05-03",
    noOfLike: 910,
    noOfComments: 980,
  },
  {
    _id: "15",
    title: "Chapter 15",
    releaseDate: "2022-05-10",
    noOfLike: 920,
    noOfComments: 1000,
  },
  {
    _id: "16",
    title: "Chapter 16",
    releaseDate: "2022-05-17",
    noOfLike: 950,
    noOfComments: 1030,
  },
  {
    _id: "17",
    title: "Chapter 17",
    releaseDate: "2022-05-24",
    noOfLike: 980,
    noOfComments: 1060,
  },
  {
    _id: "18",
    title: "Chapter 18",
    releaseDate: "2022-05-31",
    noOfLike: 1010,
    noOfComments: 1090,
  },
  {
    _id: "19",
    title: "Chapter 19",
    releaseDate: "2022-06-07",
    noOfLike: 1040,
    noOfComments: 1120,
  },
  {
    _id: "20",
    title: "Chapter 20",
    releaseDate: "2022-06-14",
    noOfLike: 1070,
    noOfComments: 1150,
  },
  {
    _id: "21",
    title: "Chapter 21",
    releaseDate: "2022-06-21",
    noOfLike: 1100,
    noOfComments: 1180,
  },
  {
    _id: "22",
    title: "Chapter 22",
    releaseDate: "2022-06-28",
    noOfLike: 1130,
    noOfComments: 1210,
  },
  {
    _id: "23",
    title: "Chapter 23",
    releaseDate: "2022-07-05",
    noOfLike: 1160,
    noOfComments: 1240,
  },
  {
    _id: "24",
    title: "Chapter 24",
    releaseDate: "2022-07-12",
    noOfLike: 1190,
    noOfComments: 1270,
  },
  {
    _id: "25",
    title: "Chapter 25",
    releaseDate: "2022-07-19",
    noOfLike: 1220,
    noOfComments: 1300,
  },
  {
    _id: "26",
    title: "Chapter 26",
    releaseDate: "2022-07-26",
    noOfLike: 1250,
    noOfComments: 1330,
  },
  {
    _id: "27",
    title: "Chapter 27",
    releaseDate: "2022-08-02",
    noOfLike: 1280,
    noOfComments: 1360,
  },
  {
    _id: "28",
    title: "Chapter 28",
    releaseDate: "2022-08-09",
    noOfLike: 1310,
    noOfComments: 1390,
  },
  {
    _id: "29",
    title: "Chapter 29",
    releaseDate: "2022-08-16",
    noOfLike: 1340,
    noOfComments: 1420,
  },
  {
    _id: "30",
    title: "Chapter 30",
    releaseDate: "2022-08-23",
    noOfLike: 1370,
    noOfComments: 1450,
  },
  {
    _id: "31",
    title: "Chapter 31",
    releaseDate: "2022-08-30",
    noOfLike: 1400,
    noOfComments: 1480,
  },
  {
    _id: "32",
    title: "Chapter 32",
    releaseDate: "2022-09-06",
    noOfLike: 1430,
    noOfComments: 1510,
  },
  {
    _id: "33",
    title: "Chapter 33",
    releaseDate: "2022-09-13",
    noOfLike: 1460,
    noOfComments: 1540,
  },
  {
    _id: "34",
    title: "Chapter 34",
    releaseDate: "2022-09-20",
    noOfLike: 1490,
    noOfComments: 1570,
  },
  {
    _id: "35",
    title: "Chapter 35",
    releaseDate: "2022-09-27",
    noOfLike: 1520,
    noOfComments: 1600,
  },
  {
    _id: "36",
    title: "Chapter 36",
    releaseDate: "2022-10-04",
    noOfLike: 1550,
    noOfComments: 1630,
  },
  {
    _id: "37",
    title: "Chapter 37",
    releaseDate: "2022-10-11",
    noOfLike: 1580,
    noOfComments: 1660,
  },
  {
    _id: "38",
    title: "Chapter 38",
    releaseDate: "2022-10-18",
    noOfLike: 1610,
    noOfComments: 1690,
  },
  {
    _id: "39",
    title: "Chapter 39",
    releaseDate: "2022-10-25",
    noOfLike: 1640,
    noOfComments: 1720,
  },
  {
    _id: "40",
    title: "Chapter 40",
    releaseDate: "2022-11-01",
    noOfLike: 1670,
    noOfComments: 1750,
  },
];

const getChapters = async (req: NextRequest) => {
  try {
    const pagination = req.nextUrl.searchParams.get("pagination");
    if (pagination) {
      return NextResponse.json(
        {
          error: false,
          chapters: [],
          totalChapters: 0,
        },
        {
          status: 200,
        },
      );
    }

    const firstSix = chapters.slice(0, 6);
    const lastSix = chapters.slice(-6);
    const combinedChapters = Array.from(new Set([...firstSix, ...lastSix]));

    return NextResponse.json(
      {
        error: false,
        chapters: combinedChapters,
        totalChapters: chapters.length,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: true, message: error.message, chapters: [], totalChapters: 0 },
      {
        status: 500,
      },
    );
  }
};

export { getChapters as GET };

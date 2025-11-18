import { getUserReadings } from "@/features/meter/reading.service";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const year = Number(url.searchParams.get("year") || new Date().getFullYear());

  // const metersReadingsData = [
  //   {
  //     userId: "u1",
  //     name: "Asep",
  //     readings: {
  //       "2025-01": 120,
  //       "2025-02": 135,
  //       "2025-03": 140,
  //       "2025-04": null,
  //       "2025-05": 150,
  //       "2025-06": null,
  //       "2025-07": null,
  //       "2025-08": null,
  //       "2025-09": null,
  //       "2025-10": null,
  //       "2025-11": null,
  //       "2025-12": null,
  //     },
  //   },
  //   {
  //     userId: "u2",
  //     name: "Budi",
  //     readings: {
  //       "2025-01": 90,
  //       "2025-02": 100,
  //       "2025-03": null,
  //       "2025-04": null,
  //       "2025-05": 110,
  //       "2025-06": 120,
  //       "2025-07": null,
  //       "2025-08": null,
  //       "2025-09": null,
  //       "2025-10": null,
  //       "2025-11": null,
  //       "2025-12": null,
  //     },
  //   },
  //   {
  //     userId: "u3",
  //     name: "Cici",
  //     readings: {
  //       "2025-01": null,
  //       "2025-02": null,
  //       "2025-03": 80,
  //       "2025-04": 85,
  //       "2025-05": null,
  //       "2025-06": null,
  //       "2025-07": null,
  //       "2025-08": null,
  //       "2025-09": null,
  //       "2025-10": null,
  //       "2025-11": null,
  //       "2025-12": null,
  //     },
  //   },
  // ];

  const data = await getUserReadings(year);
  try {
    return Response.json({
      ok: true,
      message: "success",
      year: 2025,
      data,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      ok: false,
      message: "failed",
    });
  }
}

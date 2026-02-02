"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiUsers, FiEye, FiTrendingUp, FiClock } from "react-icons/fi";

interface VisitorStats {
  totalVisitors: number;
  uniqueVisitors: number;
  dailyStats: Array<{
    date: string;
    count: number;
    unique_count: number;
  }>;
  topPages: Array<{
    path: string;
    visits: number;
    unique_visits: number;
  }>;
  hourlyStats: Array<{
    hour: number;
    count: number;
  }>;
  period: string;
}

export default function DashboardClient() {
  const router = useRouter();
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("today");
  const [unauthorized, setUnauthorized] = useState(false);

  const fetchStats = async (selectedPeriod: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/visitors?period=${selectedPeriod}`, {
        credentials: "include", // ส่ง cookies ไปด้วย
      });
      
      if (response.status === 401 || response.status === 403) {
        // ไม่มีสิทธิ์เข้าถึง - redirect ไปหน้า login
        setUnauthorized(true);
        setTimeout(() => {
          router.push("/signin/admin");
        }, 2000);
        return;
      }
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
        setUnauthorized(false);
      } else {
        setUnauthorized(true);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      setUnauthorized(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(period);
    // Refresh every 30 seconds
    const interval = setInterval(() => fetchStats(period), 30000);
    return () => clearInterval(interval);
  }, [period]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
    });
  };

  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, "0")}:00`;
  };

  // แสดงข้อความเมื่อไม่มีสิทธิ์
  if (unauthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="card-title text-error justify-center">ไม่มีสิทธิ์เข้าถึง</h2>
            <p>คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาเข้าสู่ระบบในฐานะผู้ดูแลระบบ</p>
            <p className="text-sm text-base-content/70">กำลังเปลี่ยนเส้นทาง...</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2">
            Dashboard ผู้ดูแลระบบ
          </h1>
          <p className="text-base-content/70">
            สถิติการเข้าชมเว็บไซต์และข้อมูลผู้ใช้
          </p>
        </div>

        {/* Period Selector */}
        <div className="mb-6">
          <div className="tabs tabs-boxed bg-base-100">
            <button
              className={`tab ${period === "today" ? "tab-active" : ""}`}
              onClick={() => setPeriod("today")}
            >
              วันนี้
            </button>
            <button
              className={`tab ${period === "week" ? "tab-active" : ""}`}
              onClick={() => setPeriod("week")}
            >
              7 วันล่าสุด
            </button>
            <button
              className={`tab ${period === "month" ? "tab-active" : ""}`}
              onClick={() => setPeriod("month")}
            >
              30 วันล่าสุด
            </button>
            <button
              className={`tab ${period === "all" ? "tab-active" : ""}`}
              onClick={() => setPeriod("all")}
            >
              ทั้งหมด
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Visitors */}
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">ผู้เข้าชมทั้งหมด</p>
                  <p className="text-3xl font-bold">
                    {stats?.totalVisitors.toLocaleString() || 0}
                  </p>
                </div>
                <div className="bg-white/20 rounded-full p-4">
                  <FiUsers className="text-3xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Unique Visitors */}
          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm mb-1">ผู้เข้าชมไม่ซ้ำ</p>
                  <p className="text-3xl font-bold">
                    {stats?.uniqueVisitors.toLocaleString() || 0}
                  </p>
                </div>
                <div className="bg-white/20 rounded-full p-4">
                  <FiEye className="text-3xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Daily Average */}
          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-1">เฉลี่ยต่อวัน</p>
                  <p className="text-3xl font-bold">
                    {stats?.dailyStats.length
                      ? Math.round(
                          stats.dailyStats.reduce(
                            (sum, day) => sum + day.count,
                            0
                          ) / stats.dailyStats.length
                        ).toLocaleString()
                      : 0}
                  </p>
                </div>
                <div className="bg-white/20 rounded-full p-4">
                  <FiTrendingUp className="text-3xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Peak Hour */}
          <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm mb-1">ชั่วโมงที่เข้าชมมากที่สุด</p>
                  <p className="text-3xl font-bold">
                    {stats?.hourlyStats.length
                      ? formatHour(
                          stats.hourlyStats.reduce((max, hour) =>
                            hour.count > max.count ? hour : max
                          ).hour
                        )
                      : "N/A"}
                  </p>
                </div>
                <div className="bg-white/20 rounded-full p-4">
                  <FiClock className="text-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Stats Chart */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">สถิติรายวัน (7 วันล่าสุด)</h2>
              {stats?.dailyStats && stats.dailyStats.length > 0 ? (
                <div className="space-y-4">
                  {stats.dailyStats.map((day, index) => {
                    const maxCount = Math.max(
                      ...stats.dailyStats.map((d) => d.count)
                    );
                    const percentage = (day.count / maxCount) * 100;
                    return (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">
                            {formatDate(day.date)}
                          </span>
                          <span className="text-sm text-base-content/70">
                            {day.count.toLocaleString()} คน
                          </span>
                        </div>
                        <div className="w-full bg-base-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-base-content/50 py-8">
                  ไม่มีข้อมูล
                </p>
              )}
            </div>
          </div>

          {/* Hourly Stats Chart */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">สถิติรายชั่วโมง (วันนี้)</h2>
              {stats?.hourlyStats && stats.hourlyStats.length > 0 ? (
                <div className="space-y-4">
                  {stats.hourlyStats.map((hour, index) => {
                    const maxCount = Math.max(
                      ...stats.hourlyStats.map((h) => h.count)
                    );
                    const percentage = (hour.count / maxCount) * 100;
                    return (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">
                            {formatHour(hour.hour)}
                          </span>
                          <span className="text-sm text-base-content/70">
                            {hour.count.toLocaleString()} คน
                          </span>
                        </div>
                        <div className="w-full bg-base-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-base-content/50 py-8">
                  ไม่มีข้อมูล
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">หน้าเว็บที่เข้าชมมากที่สุด</h2>
            {stats?.topPages && stats.topPages.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>ลำดับ</th>
                      <th>หน้าเว็บ</th>
                      <th className="text-right">จำนวนครั้ง</th>
                      <th className="text-right">ผู้เข้าชมไม่ซ้ำ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.topPages.map((page, index) => (
                      <tr key={index}>
                        <td>
                          <div className="badge badge-primary badge-lg">
                            {index + 1}
                          </div>
                        </td>
                        <td>
                          <code className="text-sm bg-base-200 px-2 py-1 rounded">
                            {page.path || "/"}
                          </code>
                        </td>
                        <td className="text-right font-semibold">
                          {page.visits.toLocaleString()}
                        </td>
                        <td className="text-right">
                          {page.unique_visits.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-base-content/50 py-8">
                ไม่มีข้อมูล
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

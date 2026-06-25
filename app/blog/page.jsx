"use client";

import { useEffect, useState } from "react";

export default function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const feeds = [
    {
      name: "BBC News",
      url: "https://www.bbc.com/news",
      rss: "https://feeds.bbci.co.uk/news/rss.xml",
    },
    {
      name: "CNN",
      url: "https://www.cnn.com",
      rss: "http://rss.cnn.com/rss/edition.rss",
    },
    {
      name: "Reuters",
      url: "https://www.reuters.com",
      rss: "https://www.reutersagency.com/feed/?best-topics=business-finance&post_type=best",
    },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const allNews = [];

        for (const feed of feeds) {
          const res = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
              feed.rss
            )}`
          );
          const data = await res.json();

          const mapped = (data.items || []).slice(0, 5).map((item) => ({
            title: item.title,
            link: item.link,
            date: item.pubDate,
            source: feed.name,
            image: item.thumbnail || "",
          }));

          allNews.push(...mapped);
        }

        setArticles(allNews);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-2">
        🌍 Latest Global News
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Live updates from trusted external sources
      </p>

      {/* Loading */}
      {loading && (
        <p className="text-center text-blue-600 font-medium">
          Loading news...
        </p>
      )}

      {/* News Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {articles.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            {item.image && (
              <img
                src={item.image}
                alt="news"
                className="h-40 w-full object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2 line-clamp-3">
                {item.title}
              </h2>

              <p className="text-sm text-gray-500 mb-2">
                {item.source} •{" "}
                {new Date(item.date).toLocaleDateString()}
              </p>

              <a
                href={item.link}
                target="_blank"
                className="text-blue-600 font-medium hover:underline"
              >
                Read full article →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React from "react";

export default function PressReleaseDetail({ item }) {
  if (!item) {
    return (
      <div style={styles.noDetails}>
        <p>記事の詳細がありません。</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{item.title}</h1>
      <div style={styles.imageWrapper}>
        {item.image ? (
          <img src={item.image} alt={item.title} style={styles.image} />
        ) : (
          <p style={styles.noImage}>画像がありません</p>
        )}
      </div>
      <p style={styles.description}>{item.description}</p>
      <div style={styles.meta}>
        <p><strong>記事ID:</strong> {item.id}</p>
        <p><strong>ユーザーID:</strong> {item.user_id}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    lineHeight: "1.6",
    color: "#333",
    maxWidth: "600px",
    margin: "0 auto",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    //textAlign: "left",
  },
  imageWrapper: {
    //display: "flex",
    //justifyContent: "center", // Horizontally center the image
    marginBottom: "20px",
  },
  image: {
    //maxWidth: "300px", // Limit the image size
    width: "100%",
    height: "auto",
    borderRadius: "10px",
  },
  description: {
    fontSize: "18px",
    marginBottom: "20px",
    textAlign: "justify", // Better readability for long text
  },
  noImage: {
    color: "#777",
    fontStyle: "italic",
    marginBottom: "20px",
  },
  meta: {
    fontSize: "16px",
    marginTop: "10px",
    color: "#555",
  },
  noDetails: {
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
  },
};


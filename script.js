const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// #タグで記事を絞り込み
const tags = document.querySelectorAll(".tag");
const posts = document.querySelectorAll(".post-card");

tags.forEach(tag => {
  tag.addEventListener("click", () => {
    tags.forEach(t => t.classList.remove("active"));
    tag.classList.add("active");
    const selected = tag.dataset.tag;

    posts.forEach(post => {
      const matches = selected === "all" || post.dataset.tags.split(" ").includes(selected);
      post.style.display = matches ? "" : "none";
    });
  });
});

// スクロールでふわっと表示
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// 写真拡大
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
};

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    const src = item.dataset.image;
    // 実画像がないデモ状態ではプレースホルダーのまま
    lightboxImage.src = src;
    lightboxImage.alt = item.querySelector("img")?.alt || "lilla gallery";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

document.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});

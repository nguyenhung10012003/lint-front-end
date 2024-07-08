export function extractHashtags(text: string) {
  const regex = /#\w+/g; // Biểu thức chính quy tìm các từ bắt đầu bằng #
  const hashtags = text.match(regex) || null; // Tìm tất cả các khớp với biểu thức chính quy

  // Loại bỏ các hashtag khỏi chuỗi ban đầu
  const textWithoutHashtags = text.replace(regex, "").trim();

  return {
    hashtags: hashtags,
    text: textWithoutHashtags,
  };
}

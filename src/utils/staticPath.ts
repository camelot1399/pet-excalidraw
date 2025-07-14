export const getStaticFilesPath = () => {
  let stend;
  const match = window.location.origin.match(/www.\w\d+/g);

  if (match) {
    stend = `${match[0].replace("www.", "")}.`;
  }

  return `https://st.${match ? stend : ""}championat.com`;
};

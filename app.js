const token = 'YOUR_PERSONAL_ACCESS_TOKEN';

const form = document.querySelector(".search");

function base64ToUtf8(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(bytes);
}

async function findProfile(profile_name) {
  const profileContainer = document.querySelector(".profile-container");
  const img = document.querySelector(".image-profile");
  const name = document.querySelector(".name");
  const username = document.querySelector(".username");
  const bio = document.querySelector(".bio");
  const followers = document.querySelector(".followers");
  const following = document.querySelector(".following");

  const readme = document.querySelector(".readme");

  try {
    const profile = await fetch(
      `https://api.github.com/users/${profile_name}`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    const profileJson = await profile.json();
    if (profileJson.message === "Not Found") {
      window.alert("Profile not found");
      return;
    }

    img.style.display = "block";
    img.src = profileJson.avatar_url;

    const anchor = document.createElement("a");
    username.innerHTML = "";
    anchor.href = `https://github.com/${profileJson.login}`;
    anchor.textContent = profileJson.login;
    anchor.target = "_blank";
    username.appendChild(anchor);
    name.textContent = profileJson.name;
    followers.textContent = profileJson.followers + " followers";
    following.textContent = profileJson.following + " following";
    if (profileJson.bio !== null) {
      bio.textContent = profileJson.bio;
    }

    profileContainer.style.display = "flex";
    const readmeResponse = await fetch(
      `https://api.github.com/repos/${profile_name}/${profile_name}/contents`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    const readmeJson = await readmeResponse.json();

    if (readmeJson.length === 0 || readmeJson.message === "Not Found") {
      readme.textContent = "No README.md found";
      return;
    }

    const readmeContent = await fetch(
      `https://api.github.com/repos/${profile_name}/${profile_name}/contents/${readmeJson[0].name}`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    const readmeContentJson = await readmeContent.json();
    const fileContent = base64ToUtf8(readmeContentJson.content);
    const htmlContent = marked.parse(fileContent);
    readme.innerHTML = htmlContent;
  } catch (error) {
    // window.alert(error.message);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("search-profile").value;
  document.getElementById("search-profile").value = "";
  findProfile(input);
});

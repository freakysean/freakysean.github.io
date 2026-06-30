const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "content-type": "application/json",
    "cache-control": "no-store"
  },
  body: JSON.stringify(body)
});

const avatarUrl = (user) => {
  if (!user.avatar) return null;

  const extension = user.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=128`;
};

export const handler = async () => {
  const token = process.env.DISCORD_BOT_TOKEN;
  const userId = process.env.DISCORD_USER_ID;

  if (!token || !userId) {
    return json(200, {
      configured: false
    });
  }

  try {
    const response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
      headers: {
        authorization: `Bot ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Discord request failed: ${response.status}`);
    }

    const user = await response.json();
    const displayName = user.global_name || user.username;

    return json(200, {
      configured: true,
      id: user.id,
      username: user.username,
      displayName,
      avatar: avatarUrl(user),
      profileUrl: `https://discord.com/users/${user.id}`
    });
  } catch {
    return json(500, {
      configured: true,
      error: "Unable to load Discord profile."
    });
  }
};

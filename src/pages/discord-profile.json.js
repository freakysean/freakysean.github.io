const avatarUrl = (user) => {
  if (!user.avatar) return null;

  const extension = user.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=128`;
};

const json = (body, status = 200) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=3600",
    },
  });
};

export async function GET() {
  const token = import.meta.env.DISCORD_BOT_TOKEN;
  const userId = import.meta.env.DISCORD_USER_ID;

  if (!token || !userId) {
    return json({
      configured: false,
      missing: {
        token: !Boolean(token),
        userId: !Boolean(userId),
      },
    });
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/users/${userId}`,
      {
        headers: {
          Authorization: `Bot ${token}`,
        },
      },
    );

    if (!response.ok) {
      return json(
        {
          configured: true,
          error: "Discord request failed.",
          status: response.status,
        },
        500,
      );
    }

    const user = await response.json();

    return json({
      configured: true,
      id: user.id,
      username: user.username,
      displayName: user.global_name || user.username,
      avatar: avatarUrl(user),
      profileUrl: `https://discord.com/users/${user.id}`,
    });
  } catch (error) {
    return json(
      {
        configured: true,
        error: "Unable to load Discord profile.",
        detail: error.message,
      },
      500,
    );
  }
}

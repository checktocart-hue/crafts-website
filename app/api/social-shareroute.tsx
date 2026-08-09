import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { title, link, imageUrl } = await req.json();

    // These environment variables will come from your Meta Developer App
    const PAGE_ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN;
    const FB_PAGE_ID = process.env.FB_PAGE_ID;
    const IG_ACCOUNT_ID = process.env.IG_ACCOUNT_ID;

    if (!PAGE_ACCESS_TOKEN) {
      return NextResponse.json({ error: "Missing Meta tokens" }, { status: 500 });
    }

    const message = `New Guide Alert! 🛠️✨\n\n${title}\n\nRead the full review here: ${link}`;

    // -------------------------------------------------------------
    // 1. POST TO FACEBOOK PAGE
    // -------------------------------------------------------------
    const fbResponse = await fetch(`https://graph.facebook.com/v19.0/${FB_PAGE_ID}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: message,
        link: link,
        access_token: PAGE_ACCESS_TOKEN,
      }),
    });
    
    const fbResult = await fbResponse.json();

    // -------------------------------------------------------------
    // 2. POST TO INSTAGRAM (Requires a 2-step process)
    // -------------------------------------------------------------
    // Step A: Create the media container
    const igContainerRes = await fetch(`https://graph.facebook.com/v19.0/${IG_ACCOUNT_ID}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_url: imageUrl,
        caption: message,
        access_token: PAGE_ACCESS_TOKEN,
      }),
    });
    const igContainer = await igContainerRes.json();

    // Step B: Publish the container
    let igResult = null;
    if (igContainer.id) {
      const igPublishRes = await fetch(`https://graph.facebook.com/v19.0/${IG_ACCOUNT_ID}/media_publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creation_id: igContainer.id,
          access_token: PAGE_ACCESS_TOKEN,
        }),
      });
      igResult = await igPublishRes.json();
    }

    return NextResponse.json({ success: true, fbResult, igResult });

  } catch (error) {
    console.error("Social share error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
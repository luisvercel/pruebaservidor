import { NextRequest, NextResponse } from 'next/server';
import config from "../../../config/config";

export async function POST(request: NextRequest) {

  try {
    const body = await request.json();
    // Redirige la request a la API externa
    // Aquí va la dirección del lambda de FastAPI

    console.log( config.baseUrlAPI + body.endpoint);

    const externalResponse = await fetch(config.baseUrlAPI + body.endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
          "Content-Type": "application/json",
        }
    });

    const responseData = await externalResponse.json();

    console.log( responseData );

    return NextResponse.json(responseData);

  } catch (error) {
    return NextResponse.json(
      { error: 'Error al llamar API externa. '},
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get('file')

  if (!file) {
    return NextResponse.json({ error: 'File parameter required' }, { status: 400 })
  }

  const allowedFiles = [
    'Diapositivas.html',
    'Folleto del asistente.html',
    '10 Prompts esenciales.html',
    'Tarjeta A5.html',
    'Diapositivas.pdf',
    'Folleto del asistente.pdf',
    '10 Prompts esenciales.pdf',
    'Tarjeta A5.pdf',
  ]

  if (!allowedFiles.includes(file)) {
    return NextResponse.json({ error: 'File not allowed' }, { status: 403 })
  }

  try {
    const filePath = join(process.cwd(), 'public', file)
    const fileContent = await readFile(filePath)

    const isHtml = file.endsWith('.html')
    const contentType = isHtml ? 'text/html; charset=utf-8' : 'application/pdf'

    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${file}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}

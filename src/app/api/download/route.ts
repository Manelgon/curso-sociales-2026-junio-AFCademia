import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get('file')

  if (!file) {
    return NextResponse.json({ error: 'File parameter required' }, { status: 400 })
  }

  // Whitelist de archivos permitidos
  const allowedFiles = [
    '01 Manual del Alumno.html',
    '02 Cuaderno de Practicas.html',
    '03 Diapositivas.html',
    '04 Cheatsheet.html',
    '05 Plantillas Prompts.html',
    'Manual del Alumno · Construye tu automatización paso a paso · AFCademIA.pdf',
    'Cuaderno de prácticas · AFCademIA.pdf',
    'Diapositivas · Automatización emails con IA · AFCademIA.pdf',
    'Cheatsheet · Make.com + IA · AFCademIA.pdf',
    'Plantillas de prompts · AFCademIA.pdf',
  ]

  if (!allowedFiles.includes(file)) {
    return NextResponse.json({ error: 'File not allowed' }, { status: 403 })
  }

  try {
    const filePath = join(process.cwd(), 'public', file)
    const fileContent = await readFile(filePath)

    const isHtml = file.endsWith('.html')
    const contentType = isHtml ? 'text/html; charset=utf-8' : 'application/pdf'
    const fileName = file.split('/').pop() || 'download'

    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}

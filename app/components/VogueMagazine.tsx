
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, PDFDocumentLoadingTask } from "pdfjs-dist";

const PDF_URL = "/vogue/australia.pdf";
const WORKER_URL = "/vogue/pdf.worker.min.mjs";


export default function VogueMagazine() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<any>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [containerWidth, setContainerWidth] = useState(900);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Carrega o PDF.js somente no navegador para evitar sua avaliação no servidor.
  useEffect(() => {
    let active = true;
    let loadingTask: PDFDocumentLoadingTask | null = null;

    async function loadPdf() {
      try {
        const pdfjsLib = await import("pdfjs-dist");

        if (!active) return;

        pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_URL;

        loadingTask = pdfjsLib.getDocument({
          url: PDF_URL,
        });

        const pdf = await loadingTask.promise;

        if (!active) return;

        pdfRef.current = pdf;
        setTotalPages(pdf.numPages);
        setLoading(false);
      } catch (err: unknown) {
        if (!active) return;

        console.error("Erro ao carregar o PDF:", err);
        setError(
          "Não foi possível carregar a revista. Verifique o PDF e o worker."
        );
        setLoading(false);
      }
    }

    void loadPdf();

    return () => {
      active = false;
      pdfRef.current = null;
      if (loadingTask) {
        void loadingTask.destroy();
      }
    };
  }, []);

  // Detecta a largura disponível.
  useEffect(() => {
    const element = viewerRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (entry) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Renderiza somente a página selecionada.
  useEffect(() => {
    const pdf = pdfRef.current;
    const canvasElement = canvasRef.current;

    if (
      pdf === null ||
      canvasElement === null ||
      totalPages === 0
    ) {
      return;
    }

    // Referências verificadas e não nulas.
    const documentProxy: PDFDocumentProxy = pdf;
    const canvas: HTMLCanvasElement = canvasElement;

    let cancelled = false;
    let currentRenderTask: any = null;

    async function renderPage() {
      try {
        const pdfPage = await documentProxy.getPage(page);

        if (cancelled) return;

        const originalViewport = pdfPage.getViewport({
          scale: 1,
        });

        const availableWidth = Math.max(200, containerWidth - 64);

        // Reserva espaço para o cabeçalho, os controles e o rodapé.
        // Isso é especialmente importante no preview dividido do VS Code.
        const availableHeight = Math.max(240, window.innerHeight * 0.48);

        const widthScale = availableWidth / originalViewport.width;
        const heightScale = availableHeight / originalViewport.height;

        // A página sempre respeita os limites de largura e altura.
        const scale = Math.min(widthScale, heightScale, 1.4);

        const viewport = pdfPage.getViewport({
          scale,
        });

        // Limita a resolução para reduzir o consumo de memória.
        const outputScale = Math.min(
          window.devicePixelRatio || 1,
          1.5
        );

        const context = canvas.getContext("2d");

        if (context === null) {
          throw new Error(
            "Não foi possível criar o contexto do canvas."
          );
        }

        canvas.width = Math.floor(
          viewport.width * outputScale
        );

        canvas.height = Math.floor(
          viewport.height * outputScale
        );

        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        // O canvas é obrigatório na versão do PDF.js
        // instalada neste projeto.
        const task = pdfPage.render({
          canvas,
          canvasContext: context,
          viewport,
          transform: [
            outputScale,
            0,
            0,
            outputScale,
            0,
            0,
          ],
        });

        currentRenderTask = task;
        renderTaskRef.current = task;

        await task.promise;

        if (renderTaskRef.current === task) {
          renderTaskRef.current = null;
        }
      } catch (err: unknown) {
        const renderError = err as {
          name?: string;
          message?: string;
        };

        if (
          !cancelled &&
          renderError.name !== "RenderingCancelledException"
        ) {
          console.error("Erro ao renderizar a página:", err);
          setError("Não foi possível renderizar esta página.");
        }
      }
    }

    void renderPage();

    return () => {
      cancelled = true;

      if (currentRenderTask) {
        currentRenderTask.cancel();
      }

      if (renderTaskRef.current === currentRenderTask) {
        renderTaskRef.current = null;
      }
    };
  }, [page, totalPages, containerWidth]);

  // Navegação entre páginas.
  const changePage = useCallback(
    (nextPage: number) => {
      if (nextPage < 1 || nextPage > totalPages) {
        return;
      }

      setError("");
      setPage(nextPage);
    },
    [totalPages]
  );

  // Tela cheia.
  async function toggleFullscreen() {
    const viewer = viewerRef.current;

    if (!viewer) return;

    try {
      if (!document.fullscreenElement) {
        await viewer.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Erro ao abrir tela cheia:", err);
    }
  }

  return (
    <section className="sl-transition w-full bg-[#8CFF00] px-4 py-12 text-white md:px-8 md:py-16">
      <div className="mx-auto w-full max-w-350">
        {/* Cabeçalho editorial */}
        <header className="mb-8 border-b border-white/20 pb-5">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-black">
            Saint Lovers — Digital Archive
          </p>

          <h2 className="text-3xl text-black font-light uppercase tracking-[0.12em] md:text-5xl">
            Vogue Australia
          </h2>

          <p className="mt-3 text-sm tracking-wider text-black">
            April 2023 Edition
          </p>
        </header>

        {/* Visualizador */}
        <div
          ref={viewerRef}
          className="relative w-full bg-[#101010] p-4 md:p-8"
        >
          <div className="flex min-h-[55vh] items-center justify-center overflow-visible">
            {loading && (
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Loading edition...
              </p>
            )}

            {!loading && error && (
              <div className="max-w-md py-12 text-center">
                <p
                  role="alert"
                  className="text-sm text-red-300"
                >
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-5 border border-white/30 px-5 py-3 text-xs uppercase tracking-widest transition hover:bg-white hover:text-black"
                >
                  Reload magazine
                </button>
              </div>
            )}

            {!loading && !error && totalPages > 0 && (
              <div key={page} className="magazine-page">
                <canvas
                  ref={canvasRef}
                  aria-label={`Página ${page} da revista`}
                  className="block h-auto max-w-full bg-white shadow-2xl"
                />
              </div>
            )}
          </div>

          {/* Controles */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
            <span className="text-xs uppercase tracking-widest text-white/60">
              Page {page} / {totalPages || "—"}
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => changePage(page - 1)}
                disabled={page <= 1 || loading || !!error}
                aria-label="Página anterior"
                className="border border-white/20 px-4 py-2 transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() => changePage(page + 1)}
                disabled={
                  page >= totalPages || loading || !!error
                }
                aria-label="Próxima página"
                className="border border-white/20 px-4 py-2 transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
              >
                →
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="border border-white/20 px-4 py-2 text-xs uppercase tracking-widest transition hover:bg-white hover:text-black"
              >
                Fullscreen
              </button>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <footer className="mt-5 flex flex-wrap justify-between gap-4 border-t border-white/20 pt-5">
          <span className="text-xs uppercase tracking-widest text-white/40">
            Fashion Archive
          </span>

          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-white/80 transition-colors hover:text-white"
          >
            Open PDF ↗
          </a>
        </footer>
      </div>
    </section>
  );
}

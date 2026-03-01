"use client";
import React, { useEffect, useState } from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import Navbar from '@/app/components/Navbar'
import styles from "./Read.module.css";
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"

  const Page = () => {
    const router = useRouter();
    const { bookid } = useParams();
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
      <div className={styles.main}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.viewer}>
            {pdfUrl ? (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer
                  fileUrl="https://pdfobject.com/pdf/sample-3pp.pdf"
                  plugins={[defaultLayoutPluginInstance]}
                  theme="dark"
                />
              </Worker>
            ) : (
              <p>Loading PDF...</p>
            )}
          </div>
        </div>
      </div>
    )
  }

export default Page

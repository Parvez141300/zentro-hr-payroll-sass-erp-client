import About from '@/components/modules/common/about/About';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Zentro, the modern HR and Payroll ERP platform built for growing organizations.",
};

const AboutUsPage = () => {
  return (
    <About />
  )
}

export default AboutUsPage
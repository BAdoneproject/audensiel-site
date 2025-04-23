'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Step {
  title: string;
  description: string;
  icon: string;
  color: string;
  tools: string[];
}

export default function Introduction() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const steps: Step[] = [
    {
      title: "Création du Projet",
      description: "On commence par créer la structure de base du projet avec les bons outils. C'est comme préparer son atelier avant de commencer à bricoler !",
      icon: "🏗️",
      color: "from-blue-50 to-green-50",
      tools: ["VS Code", "Node.js", "npm", "Next.js", "TypeScript"]
    },
    {
      title: "Gestion du Code Source",
      description: "On utilise Git pour sauvegarder notre travail et collaborer avec l'équipe. Comme un carnet qui garde l'historique de toutes nos modifications.",
      icon: "🌳",
      color: "from-green-50 to-teal-50",
      tools: ["Git", "GitHub", "GitLab", "Branches", "Commits"]
    },
    {
      title: "Base de Données",
      description: "On choisit comment stocker nos données de manière organisée et sécurisée. C'est le coffre-fort de notre application !",
      icon: "💾",
      color: "from-purple-50 to-pink-50",
      tools: ["PostgreSQL", "MongoDB", "MySQL", "Redis"]
    },
    {
      title: "Déploiement",
      description: "On met notre application en ligne pour que tout le monde puisse y accéder. Comme ouvrir un nouveau magasin !",
      icon: "🚀",
      color: "from-orange-50 to-red-50",
      tools: ["AWS", "Vercel", "Docker", "Kubernetes"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto p-6 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Parcours de développement web
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez étape par étape comment construire et déployer une application moderne
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-r ${step.color} p-6 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                selectedStep === index ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedStep(selectedStep === index ? null : index)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{step.icon}</span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {step.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {step.description}
                  </p>
                  
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: selectedStep === index ? 'auto' : 0,
                      opacity: selectedStep === index ? 1 : 0
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="font-medium text-gray-700 mb-2">
                        Outils et Technologies :
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {step.tools.map(tool => (
                          <span
                            key={tool}
                            className="px-3 py-1 bg-white rounded-full text-sm text-gray-700"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/react-nextjs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <span>Choisir un Framework</span>
            <span>→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
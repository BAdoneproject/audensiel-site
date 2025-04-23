'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Merci() {
  const modules = [
    { name: "Introduction", icon: "👋" },
    { name: "React & Next.js", icon: "⚛️" },
    { name: "Git", icon: "🌿" },
    { name: "Base de données", icon: "💾" },
    { name: "Déploiement", icon: "🚀" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <span className="text-4xl">🎉</span>
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Félicitations !
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Vous avez terminé avec succès votre parcours d&apos;initiation au développement web
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Votre Parcours
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {modules.map((module, index) => (
                <motion.div
                  key={module.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl"
                >
                  <div className="text-3xl mb-2">{module.icon}</div>
                  <div className="text-sm font-medium text-gray-700">{module.name}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-2xl mb-12">
            <h2 className="text-2xl font-bold mb-4">Et maintenant ?</h2>
            <p className="mb-6">
              Ce n&apos;est que le début de votre voyage dans le développement web. 
              Continuez à pratiquer et à explorer de nouvelles technologies !
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-white/10 p-4 rounded-xl">
                <h3 className="font-medium mb-2">🔍 Explorer plus</h3>
                <p className="text-sm">
                  Découvrez d&apos;autres frameworks et outils pour enrichir vos compétences
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl">
                <h3 className="font-medium mb-2">🛠️ Pratiquer</h3>
                <p className="text-sm">
                  Créez vos propres projets pour consolider vos connaissances
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="inline-block bg-white px-8 py-4 rounded-xl shadow-lg text-gray-800 hover:shadow-xl transition-shadow"
          >
            Retour à l&apos;accueil →
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

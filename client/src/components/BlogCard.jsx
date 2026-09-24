import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

const BlogCard = ({ article }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-700">
          {article.category || 'Cleaning Tips'}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center space-x-3 text-xs text-slate-400 mb-2">
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-teal-600" />
              {new Date(article.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-teal-600" />
              {article.readTime || '4 min read'}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="text-slate-600 text-sm mt-2 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium flex items-center">
            <User className="w-3.5 h-3.5 mr-1 text-slate-400" />
            {article.author || 'CleanNest Team'}
          </span>

          <Link
            to={`/blog/${article.slug}`}
            className="inline-flex items-center space-x-1 text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

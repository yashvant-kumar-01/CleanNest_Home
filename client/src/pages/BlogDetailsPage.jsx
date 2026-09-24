import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Calendar, User, Clock, ChevronRight, ArrowLeft } from 'lucide-react';

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/articles/${slug}`);
        setArticle(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Article not found');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) return <LoadingSpinner fullScreen={true} />;
  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <ErrorMessage message={error || 'Article not found'} />
        <Link to="/blog" className="inline-flex items-center space-x-2 text-teal-700 font-bold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16">
      {/* Breadcrumb */}
      <div className="bg-slate-100 border-b border-slate-200 py-3">
        <div className="max-w-4xl mx-auto px-4 text-xs font-semibold text-slate-500 flex items-center space-x-2">
          <Link to="/" className="hover:text-teal-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/blog" className="hover:text-teal-700">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 truncate">{article.title}</span>
        </div>
      </div>

      {/* Article Content Container */}
      <article className="max-w-4xl mx-auto px-4 space-y-8">
        
        {/* Title & Metadata */}
        <div className="space-y-4 text-center sm:text-left">
          <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3.5 py-1 rounded-full uppercase">
            {article.category || 'Cleaning Guide'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 border-y border-slate-200 py-3">
            <span className="flex items-center font-medium text-slate-800">
              <User className="w-3.5 h-3.5 mr-1 text-teal-600" />
              {article.author}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-teal-600" />
              {new Date(article.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-teal-600" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md h-80 sm:h-[420px]">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Excerpt */}
        <div className="bg-teal-50/70 p-5 rounded-2xl border border-teal-200/80 text-teal-950 font-medium text-base italic leading-relaxed">
          "{article.excerpt}"
        </div>

        {/* Full Content */}
        <div className="prose prose-slate max-w-none text-slate-700 text-base leading-relaxed space-y-4 whitespace-pre-line">
          {article.content}
        </div>

        {/* Bottom CTA */}
        <div className="pt-8 border-t border-slate-200 flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-sm font-bold text-slate-700 hover:text-teal-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </Link>

          <Link
            to="/booking"
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            Book Cleaning Service
          </Link>
        </div>

      </article>
    </div>
  );
};

export default BlogDetailsPage;

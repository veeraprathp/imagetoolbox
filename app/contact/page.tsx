'use client';
import { useState } from 'react';
import { useToast } from '../../components/Toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast(data.error ?? 'Something went wrong.', 'error');
      } else {
        setSent(true);
        toast('Message sent! We\'ll get back to you soon.', 'success');
      }
    } catch {
      toast('Network error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Contact / Feedback</h1>
      <p className="text-gray-500 mb-8">Found a bug? Have a feature request? We'd love to hear from you.</p>

      {sent ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h2>
          <p className="text-green-700 text-sm mb-4">Thanks for reaching out. We'll get back to you soon.</p>
          <button
            onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
            className="text-sm text-green-700 underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 bg-gray-50 rounded-2xl p-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
            <input
              type="text" required value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
            <input
              type="email" required value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Message</label>
            <textarea
              required rows={5} value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Describe your feedback or bug report..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none resize-none"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{form.message.length}/2000</p>
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            {loading ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}

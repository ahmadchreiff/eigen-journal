import React, { useState, useEffect } from 'react';
import {
  FiUpload, FiUser, FiMail, FiBook, FiTag, FiFileText, FiImage,
  FiArrowRight, FiArrowLeft, FiCheck, FiX, FiEye, FiSave,
  FiCalendar, FiClock, FiUsers, FiBookOpen, FiTrendingUp
} from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Bottombar from '@/components/Bottombar';

interface FormData {
  // Author Information
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  affiliation: string;
  year: string;
  major: string;

  // Article Information
  title: string;
  abstract: string;
  category: string;
  keywords: string[];

  // Files
  articlePdf: File | null;

  // Metadata
  isOriginalWork: boolean;
  hasEthicsApproval: boolean;
  agreedToTerms: boolean;
}

export default function SubmitResearch() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    affiliation: 'American University of Beirut',
    year: '',
    major: '',
    title: '',
    abstract: '',
    category: '',
    keywords: [],
    articlePdf: null,
    isOriginalWork: false,
    hasEthicsApproval: false,
    agreedToTerms: false
  });

  const [keywordInput, setKeywordInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const totalSteps = 3;
  const categories = [
    { id: 'cmps', name: 'Computer Science', icon: '💻', color: 'from-blue-500 to-red-600' },
    { id: 'math', name: 'Mathematics', icon: '🔢', color: 'from-green-500 to-teal-600' },
    { id: 'phys', name: 'Physics', icon: '⚛️', color: 'from-orange-500 to-red-600' }
  ];

  const years = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate', 'PhD'];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      handleInputChange('keywords', [...formData.keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    handleInputChange('keywords', formData.keywords.filter(k => k !== keyword));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files && files[0]) {
      handleInputChange('articlePdf', files[0]);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && formData.studentId);
      case 2:
        return !!(formData.title && formData.abstract && formData.category && formData.keywords.length > 0 && formData.articlePdf);
      case 3:
        return formData.isOriginalWork && formData.agreedToTerms;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      if (formData.articlePdf) {
        formDataToSend.append("pdf", formData.articlePdf);
      }

      const {
        articlePdf, // exclude file from metadata
        ...meta
      } = formData;

      formDataToSend.append("metadata", JSON.stringify(meta));

      const res = await fetch("http://localhost:8080/api/drafts", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      alert("✅ Draft submitted! ID: " + data.draftId);
      // Optionally: router.push("/thank-you");
    } catch (err: any) {
      alert("❌ Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Author Information</h2>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="your.email@mail.aub.edu"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Student ID *</label>
                <input
                  type="text"
                  value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Enter your student ID"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Academic Year</label>
                <select
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                >
                  <option value="">Select your year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Major</label>
                <input
                  type="text"
                  value={formData.major}
                  onChange={(e) => handleInputChange('major', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="e.g., Computer Science"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Research Details & Article Upload</h2>
              <p className="text-gray-600">Provide information about your research and upload your PDF article</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Article Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                placeholder="Enter a compelling title for your research"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <div className="grid md:grid-cols-3 gap-4">
                {categories.map(category => (
                  <div
                    key={category.id}
                    onClick={() => handleInputChange('category', category.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.category === category.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <div className="font-semibold text-gray-900">{category.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Abstract *</label>
              <textarea
                value={formData.abstract}
                onChange={(e) => handleInputChange('abstract', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                placeholder="Provide a concise abstract of your research (250-300 words recommended)"
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.abstract.length} characters
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Keywords *</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Add keywords related to your research"
                />
                <button
                  onClick={addKeyword}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.keywords.map(keyword => (
                  <span
                    key={keyword}
                    className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {keyword}
                    <button
                      onClick={() => removeKeyword(keyword)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Article PDF *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-500 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="article-upload"
                />
                <label htmlFor="article-upload" className="cursor-pointer">
                  <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-lg font-semibold text-gray-700 mb-2">
                    {formData.articlePdf ? formData.articlePdf.name : 'Upload Your Research Article'}
                  </div>
                  <div className="text-sm text-gray-500">
                    PDF files only • Max 25MB • Should include your complete research with references
                  </div>
                </label>
              </div>
              {formData.articlePdf && (
                <div className="mt-4 flex items-center justify-between bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FiFileText className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-sm font-semibold text-green-800">{formData.articlePdf.name}</div>
                      <div className="text-xs text-green-600">
                        {(formData.articlePdf.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleInputChange('articlePdf', null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <FiBookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <strong>Article Requirements:</strong><br />
                  Please ensure your PDF includes: title page, abstract, introduction, methodology, results,
                  discussion, conclusion, and references. The article should be well-formatted and ready for review.
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Review & Submit</h2>
              <p className="text-gray-600">Review your submission and agree to terms</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Summary</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div><strong>Author:</strong> {formData.firstName} {formData.lastName}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Student ID:</strong> {formData.studentId}</div>
                <div><strong>Academic Year:</strong> {formData.year || 'Not specified'}</div>
                <div><strong>Major:</strong> {formData.major || 'Not specified'}</div>
                <div><strong>Title:</strong> {formData.title}</div>
                <div><strong>Category:</strong> {categories.find(c => c.id === formData.category)?.name}</div>
                <div><strong>Keywords:</strong> {formData.keywords.join(', ')}</div>
                <div><strong>Article PDF:</strong> {formData.articlePdf?.name || 'None'}</div>
                <div><strong>Abstract Length:</strong> {formData.abstract.length} characters</div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.isOriginalWork}
                  onChange={(e) => handleInputChange('isOriginalWork', e.target.checked)}
                  className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">
                  I confirm that this is original work and I have the right to submit it for publication.
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.hasEthicsApproval}
                  onChange={(e) => handleInputChange('hasEthicsApproval', e.target.checked)}
                  className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">
                  If applicable, I have obtained necessary ethics approvals for this research.
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                  className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to the <a href="#" className="text-red-600 hover:underline">terms and conditions</a> and
                  <a href="#" className="text-red-600 hover:underline ml-1">publication guidelines</a>.
                </span>
              </label>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <FiClock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <strong>What happens next?</strong><br />
                  Your submission will be reviewed by our editorial team within 7-10 business days.
                  You'll receive an email notification with the review outcome.
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Step indicators and connecting lines */}
          <div className="relative flex items-center justify-between mb-8">
            {/* Background line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>

            {/* Progress line */}
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 -translate-y-1/2 z-10 transition-all duration-700 ease-out"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>

            {/* Step circles */}
            {[
              { id: 1, label: 'Author Info' },
              { id: 2, label: 'Research Details' },
              { id: 3, label: 'Review & Submit' }
            ].map((step, index) => (
              <div key={step.id} className="relative z-20 flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-all duration-500 ease-out transform ${step.id < currentStep
                      ? 'bg-red-500 border-red-500 text-white scale-105 shadow-lg shadow-red-200'
                      : step.id === currentStep
                        ? 'bg-red-500 border-red-500 text-white scale-110 shadow-xl shadow-red-200 ring-4 ring-red-100'
                        : 'bg-white border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-500'
                    }`}
                >
                  {step.id < currentStep ? (
                    <FiCheck className="w-5 h-5" />
                  ) : step.id === currentStep ? (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  ) : (
                    step.id
                  )}
                </div>

                {/* Step label */}
                <div className="mt-3 text-center">
                  <div
                    className={`text-sm font-medium transition-colors duration-300 ${step.id <= currentStep
                        ? 'text-red-600'
                        : 'text-gray-400'
                      }`}
                  >
                    {step.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-8 border-t">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                <FiArrowLeft />
                Previous
              </button>

              <div className="flex gap-3">
                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${validateStep(currentStep)
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    Next
                    <FiArrowRight />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!validateStep(currentStep) || isSubmitting}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${validateStep(currentStep) && !isSubmitting
                      ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FiCheck />
                        Submit Research
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Guidelines Sidebar */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Guidelines</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <FiBookOpen className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <strong>Original Work:</strong> All submissions must be original research not published elsewhere.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiUsers className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <strong>Peer Review:</strong> Articles undergo rigorous peer review by our editorial board.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiTrendingUp className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <strong>Complete PDF:</strong> Submit your full research article as a single PDF with all sections and references.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Bottombar />
    </div>
  );
}
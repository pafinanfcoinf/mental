import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { base44 } from '@/api/base44Client';
import { 
  Send,
  Loader2,
  CheckCircle
} from 'lucide-react';

import FormHeader from '../components/form/FormHeader';
import FormFooter from '../components/form/FormFooter';
import FormSection from '../components/form/FormSection';
import FormInput from '../components/form/FormInput';
import FormRadio from '../components/form/FormRadio';
import FormCheckbox from '../components/form/FormCheckbox';
import FormFileUpload from '../components/form/FormFileUpload';
import FormDropdown from '../components/form/FormDropdown';

const governorates = [
  { value: 'cairo', label: 'القاهرة' },
  { value: 'giza', label: 'الجيزة' },
  { value: 'alexandria', label: 'الإسكندرية' },
  { value: 'dakahlia', label: 'الدقهلية' },
  { value: 'sharqia', label: 'الشرقية' },
  { value: 'qalyubia', label: 'القليوبية' },
  { value: 'beheira', label: 'البحيرة' },
  { value: 'gharbia', label: 'الغربية' },
  { value: 'monufia', label: 'المنوفية' },
  { value: 'minya', label: 'المنيا' },
  { value: 'asyut', label: 'أسيوط' },
  { value: 'sohag', label: 'سوهاج' },
  { value: 'qena', label: 'قنا' },
  { value: 'aswan', label: 'أسوان' },
  { value: 'luxor', label: 'الأقصر' },
  { value: 'red_sea', label: 'البحر الأحمر' },
  { value: 'new_valley', label: 'الوادي الجديد' },
  { value: 'matrouh', label: 'مطروح' },
  { value: 'north_sinai', label: 'شمال سيناء' },
  { value: 'south_sinai', label: 'جنوب سيناء' },
  { value: 'port_said', label: 'بورسعيد' },
  { value: 'suez', label: 'السويس' },
  { value: 'ismailia', label: 'الإسماعيلية' },
  { value: 'damietta', label: 'دمياط' },
  { value: 'kafr_el_sheikh', label: 'كفر الشيخ' },
  { value: 'fayoum', label: 'الفيوم' },
  { value: 'beni_suef', label: 'بني سويف' },
  { value: 'saudi', label: 'السعودية' },
  { value: 'uae', label: 'الإمارات' },
  { value: 'kuwait', label: 'الكويت' },
  { value: 'qatar', label: 'قطر' },
  { value: 'bahrain', label: 'البحرين' },
  { value: 'oman', label: 'عُمان' },
  { value: 'jordan', label: 'الأردن' },
  { value: 'lebanon', label: 'لبنان' },
  { value: 'iraq', label: 'العراق' },
  { value: 'syria', label: 'سوريا' },
  { value: 'palestine', label: 'فلسطين' },
  { value: 'libya', label: 'ليبيا' },
  { value: 'tunisia', label: 'تونس' },
  { value: 'algeria', label: 'الجزائر' },
  { value: 'morocco', label: 'المغرب' },
  { value: 'sudan', label: 'السودان' },
  { value: 'other', label: 'أخرى' },
];

const initialFormData = {
  // Section 1
  fullName: '',
  phone: '',
  email: '',
  governorate: '',
  
  // Section 2
  priorExperience: '',
  experienceDescription: '',
  completedCourse: '',
  certificate: '',
  
  // Section 3
  whyScholarship: '',
  professionalGoal: '',
  commitmentAvailability: '',
  
  // Section 4
  biggestChallenge: '',
  supervisionExpectations: '',
  howHeard: '',
  
  // Section 5
  agreement: false,
};

export default function ScholarshipForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatEmailBody = () => {
    const governorateLabel = governorates.find(g => g.value === formData.governorate)?.label || formData.governorate;
    
    const experienceMap = { yes: 'نعم', no: 'لا', limited: 'خبرة بسيطة' };
    const courseMap = { yes: 'نعم', no: 'لا', in_progress: 'قيد الإتمام' };
    const commitmentMap = { yes: 'نعم', no: 'لا', flexible: 'أحتاج مرونة في الوقت' };
    const howHeardMap = { 
      farida_page: 'صفحة Farida', 
      whatsapp_group: 'جروب واتساب', 
      abc_platform: 'منصة ABC of Behavior', 
      friend: 'صديق', 
      other: 'أخرى' 
    };
    
    return `
طلب جديد للتقديم على منحة الإشراف المجاني لشهادة ABAT - دفعة ديسمبر

═══════════════════════════════════════
القسم الأول: البيانات الشخصية
═══════════════════════════════════════

الاسم الكامل: ${formData.fullName}
رقم الهاتف (واتساب): ${formData.phone}
البريد الإلكتروني: ${formData.email}
المحافظة / الدولة: ${governorateLabel}

═══════════════════════════════════════
القسم الثاني: الخلفية المهنية
═══════════════════════════════════════

هل لديك أي خبرة سابقة في تحليل السلوك؟: ${experienceMap[formData.priorExperience] || formData.priorExperience}
وصف الخبرة: ${formData.experienceDescription || 'لم يتم الإدخال'}
هل حصلت على شهادة إتمام الـ40 ساعة لكورس ABAT؟: ${courseMap[formData.completedCourse] || formData.completedCourse}
${formData.certificate ? `رابط الشهادة: ${formData.certificate}` : ''}

═══════════════════════════════════════
القسم الثالث: الدافعية والالتزام
═══════════════════════════════════════

لماذا ترغبين في الحصول على هذه المنحة؟:
${formData.whyScholarship}

ما هو هدفك المهني خلال الثلاثة أشهر القادمة في مجال ABA؟:
${formData.professionalGoal}

هل يمكنك الالتزام بجلسة إشراف أسبوعية لمدة 4 أسابيع؟: ${commitmentMap[formData.commitmentAvailability] || formData.commitmentAvailability}

═══════════════════════════════════════
القسم الرابع: مدى الجدية
═══════════════════════════════════════

ما أكثر تحدٍ تواجهينه حالياً في التحضير لشهادة ABAT؟:
${formData.biggestChallenge}

ماذا تتوقعين أن يقدمه لك الإشراف خلال هذه المدة؟:
${formData.supervisionExpectations}

كيف علمتِ عن المنحة؟: ${howHeardMap[formData.howHeard] || formData.howHeard}

═══════════════════════════════════════
الموافقة
═══════════════════════════════════════

تم التأكيد على صحة المعلومات والموافقة على شروط المنحة: ✓ نعم

═══════════════════════════════════════
تم إرسال هذا الطلب من نموذج التقديم على منحة ABAT
═══════════════════════════════════════
    `.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreement) {
      alert('يرجى الموافقة على الشروط والأحكام');
      return;
    }

    setSubmitting(true);

    try {
      await base44.integrations.Core.SendEmail({
        to: 'olaabdelhady5933@gmail.com',
        subject: `${formData.email}'s form response`,
        body: formatEmailBody()
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white" dir="rtl">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-violet-100 p-10 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-violet-600" />
            </div>
            <h2 className="text-xl font-bold text-violet-900 mb-3">
              تم إرسال طلبك بنجاح
            </h2>
            <p className="text-violet-500 mb-6 text-sm">
              شكراً لتقديمك على منحة الإشراف المجاني. سيتم مراجعة طلبك والتواصل معك قريباً.
            </p>
            <div className="bg-violet-50 rounded-xl p-4 text-violet-600 text-sm border border-violet-100">
              نتمنى لك التوفيق في رحلتك نحو الحصول على شهادة ABAT
            </div>
          </motion.div>
          <FormFooter />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-purple-50/30 to-white" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormHeader />

          {/* Section 1: Personal Information */}
          <FormSection
            title="البيانات الشخصية"
            sectionNumber="1"
            index={1}
          >
            <FormInput
              label="الاسم الكامل"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="أدخل اسمك الكامل"
            />
            <FormInput
              label="رقم الهاتف (واتساب)"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              required
              placeholder="مثال: 01xxxxxxxxx"
            />
            <FormInput
              label="البريد الإلكتروني"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
              placeholder="example@email.com"
            />
            <FormDropdown
              label="المحافظة / الدولة"
              name="governorate"
              value={formData.governorate}
              onChange={handleChange}
              options={governorates}
              required
              placeholder="اختر المحافظة أو الدولة"
            />
          </FormSection>

          {/* Section 2: Professional Background */}
          <FormSection
            title="الخلفية المهنية"
            sectionNumber="2"
            index={2}
          >
            <FormRadio
              label="هل لديك أي خبرة سابقة في تحليل السلوك؟"
              name="priorExperience"
              value={formData.priorExperience}
              onChange={handleChange}
              required
              options={[
                { value: 'yes', label: 'نعم' },
                { value: 'no', label: 'لا' },
                { value: 'limited', label: 'خبرة بسيطة' },
              ]}
            />
            <FormInput
              label="اذكري خبرتك باختصار (إن وجدت)"
              name="experienceDescription"
              value={formData.experienceDescription}
              onChange={handleChange}
              multiline
              rows={3}
              placeholder="صفي خبرتك السابقة في مجال تحليل السلوك..."
            />
            <FormRadio
              label="هل حصلتِ على شهادة إتمام الـ40 ساعة لكورس ABAT؟"
              name="completedCourse"
              value={formData.completedCourse}
              onChange={handleChange}
              required
              options={[
                { value: 'yes', label: 'نعم' },
                { value: 'no', label: 'لا' },
                { value: 'in_progress', label: 'قيد الإتمام' },
              ]}
            />
            
            <AnimatePresence>
              {formData.completedCourse === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormFileUpload
                    label="رفع شهادة الـ40 ساعة"
                    name="certificate"
                    value={formData.certificate}
                    onChange={handleChange}
                    required
                    accept=".pdf,.png,.jpg,.jpeg"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </FormSection>

          {/* Section 3: Motivation & Commitment */}
          <FormSection
            title="الدافعية والالتزام"
            sectionNumber="3"
            index={3}
          >
            <FormInput
              label="لماذا ترغبين في الحصول على هذه المنحة؟"
              name="whyScholarship"
              value={formData.whyScholarship}
              onChange={handleChange}
              multiline
              rows={4}
              required
              placeholder="اشرحي دافعك للحصول على هذه المنحة..."
            />
            <FormInput
              label="ما هو هدفك المهني خلال الثلاثة أشهر القادمة في مجال ABA؟"
              name="professionalGoal"
              value={formData.professionalGoal}
              onChange={handleChange}
              multiline
              rows={3}
              required
              placeholder="اذكري أهدافك المهنية..."
            />
            <FormRadio
              label="هل يمكنك الالتزام بجلسة إشراف أسبوعية لمدة 4 أسابيع؟"
              name="commitmentAvailability"
              value={formData.commitmentAvailability}
              onChange={handleChange}
              required
              options={[
                { value: 'yes', label: 'نعم' },
                { value: 'no', label: 'لا' },
                { value: 'flexible', label: 'أحتاج مرونة في الوقت' },
              ]}
            />
          </FormSection>

          {/* Section 4: Level of Seriousness */}
          <FormSection
            title="مدى الجدية"
            sectionNumber="4"
            index={4}
          >
            <FormInput
              label="ما أكثر تحدٍ تواجهينه حالياً في التحضير لشهادة ABAT؟"
              name="biggestChallenge"
              value={formData.biggestChallenge}
              onChange={handleChange}
              multiline
              rows={3}
              required
              placeholder="اذكري التحديات التي تواجهينها..."
            />
            <FormInput
              label="ماذا تتوقعين أن يقدمه لك الإشراف خلال هذه المدة؟"
              name="supervisionExpectations"
              value={formData.supervisionExpectations}
              onChange={handleChange}
              multiline
              rows={3}
              required
              placeholder="ما هي توقعاتك من جلسات الإشراف..."
            />
            <FormRadio
              label="كيف علمتِ عن المنحة؟"
              name="howHeard"
              value={formData.howHeard}
              onChange={handleChange}
              required
              options={[
                { value: 'farida_page', label: 'صفحة Farida' },
                { value: 'whatsapp_group', label: 'جروب واتساب' },
                { value: 'abc_platform', label: 'منصة ABC of Behavior' },
                { value: 'friend', label: 'صديق' },
                { value: 'other', label: 'أخرى' },
              ]}
            />
          </FormSection>

          {/* Section 5: Agreement */}
          <FormSection
            title="موافقة المتقدم"
            sectionNumber="5"
            index={5}
          >
            <FormCheckbox
              label="أقرّ أن جميع البيانات صحيحة وأنني ملتزمة بشروط المنحة في حال قبولي"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              required
            />
          </FormSection>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              type="submit"
              disabled={submitting || !formData.agreement}
              className="w-full bg-gradient-to-l from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-6 rounded-xl text-base font-semibold shadow-lg shadow-violet-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري الإرسال...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  إرسال الطلب
                </span>
              )}
            </Button>
          </motion.div>
        </form>

        <FormFooter />
      </div>
    </div>
  );
}
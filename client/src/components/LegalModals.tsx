import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'affiliate';
}

export default function LegalModals({ isOpen, onClose, type }: LegalModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto p-6 font-sans">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-950">
            {type === 'privacy' && 'Privacy Policy'}
            {type === 'terms' && 'Terms of Service'}
            {type === 'affiliate' && 'Affiliate Disclosure'}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Last updated: June 2026
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed">
          {type === 'privacy' && (
            <>
              <p className="font-semibold text-slate-800">1. Introduction</p>
              <p>
                Welcome to Padel Fit (support@padelfit.coach). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
              </p>
              
              <p className="font-semibold text-slate-800">2. The Data We Collect About You</p>
              <p>
                We do not require users to create accounts. However, we may collect anonymous usage statistics via analytical tools (such as page views, duration on site, and quiz selections) to improve our recommendation engine. If you contact us via support@padelfit.coach, we will retain your email address and message history to resolve your query.
              </p>

              <p className="font-semibold text-slate-800">3. Cookies and Tracking</p>
              <p>
                We use cookies to remember your quiz selections and comparison matrix items. Third-party affiliate networks (Awin and Amazon) may also set tracking cookies when you click on referral links to credit commissions correctly.
              </p>

              <p className="font-semibold text-slate-800">4. Contact Information</p>
              <p>
                If you have any questions about this privacy policy, please contact us at: <span className="font-bold text-blue-600">support@padelfit.coach</span>.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p className="font-semibold text-slate-800">1. Agreement to Terms</p>
              <p>
                By accessing our website at Padel Fit, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
              </p>

              <p className="font-semibold text-slate-800">2. Use License</p>
              <p>
                Permission is granted to temporarily view the materials (information or software) on Padel Fit's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>

              <p className="font-semibold text-slate-800">3. Disclaimer</p>
              <p>
                The materials on Padel Fit's website are provided on an 'as is' basis. Padel Fit makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>

              <p>
                Further, Padel Fit does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site. Always consult a qualified medical professional before starting any strenuous exercise program if you have pre-existing joint or heart conditions.
              </p>

              <p className="font-semibold text-slate-800">4. Contact Us</p>
              <p>
                Any questions regarding these terms should be sent to: <span className="font-bold text-blue-600">support@padelfit.coach</span>.
              </p>
            </>
          )}

          {type === 'affiliate' && (
            <>
              <p className="font-semibold text-slate-800">How Our Affiliate Relationships Work</p>
              <p>
                Padel Fit is a professional review and gear recommendation platform. To support our deep biomechanical research and clinical play-testing, we partner with major racket-sport retailers via the <span className="font-bold">Awin Affiliate Network</span> and the <span className="font-bold">Amazon Services LLC Associates Program</span>.
              </p>

              <p>
                This means that when you click on certain links on our website (such as "Check Price" or "View on Amazon") and make a purchase, we may receive a small referral commission from the retailer.
              </p>

              <p className="font-semibold text-slate-800">Does This Cost You Anything Extra?</p>
              <p className="font-bold text-slate-800">
                No, absolutely not.
              </p>
              <p>
                The pricing, stock, and promotional deals you see are exactly the same as if you visited the retailer directly. In fact, our comparison engine actively works to find you the lowest price across our partner merchants to save you money.
              </p>

              <p className="font-semibold text-slate-800">Our Commitment to Integrity</p>
              <p>
                We never accept payment or free gear in exchange for positive reviews. Every shoe, racket, and apparel recommendation is determined purely by our technical algorithms and clinical criteria (e.g., age-appropriate cushioning, joint stability, and elbow safety). We only recommend gear we truly believe will improve your padel and protect your body.
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

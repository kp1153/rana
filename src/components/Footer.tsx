export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 text-gray-800 px-4 py-8 text-sm">
      <div className="max-w-5xl mx-auto text-center space-y-4">
        <div>
          <h2 className="text-xl font-bold">काशी पंचकर्म हॉस्पिटल</h2>
          <p className="italic">(आयुर्वेदिक चिकित्सा केन्द्र)</p>
        </div>

        <div>
          <h3 className="font-semibold">डॉ. विजय सिंह राणा</h3>
          <p>(B.A.M.S., P.G.D.P. (I.M.S., BHU))</p>
          <p>(आयुर्वेदिक मेडिसिन एवं पंचकर्म विशेषज्ञ)</p>
        </div>

        <div>
          <p>
            <strong>मोबाइल :</strong> 9415872553, 7355747087
          </p>
          <p>
            <strong>वेबसाइट :</strong>{' '}
            <a
              href="http://www.kashipanchkarmahospital.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              www.kashipanchkarmahospital.in
            </a>
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-10 text-left md:text-center pt-6 border-t border-gray-300">
          <div>
            <h4 className="font-semibold">हॉस्पिटल/आवास :</h4>
            <p>सुबह 9 बजे से 2 बजे तक</p>
            <p>महेशपुर (परमानन्दपुर)</p>
            <p>शिवपुर - वाराणसी</p>
          </div>

          <div>
            <h4 className="font-semibold">क्लिनिक :</h4>
            <p>एस/294-ई-1 के,</p>
            <p>हाई कोर्ट, तहसील रोड, भोजूबीर, वाराणसी</p>
            <p>संध्या - 4 बजे सायं 8 बजे तक</p>
            <p>रविवार बंद</p>
          </div>
        </div>

        {/* 🌐 वेबसाइट डेवलपर सेक्शन */}
        <div className="pt-6 border-t border-gray-300 text-center text-xs text-gray-600">
          वेबसाइट डेवलपर:{' '}
          <a
            href=" https://creativesolutions-tau.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
             https://creativesolutions-tau.vercel.app/
          </a>
        </div>
      </div>
    </footer>
  );
}

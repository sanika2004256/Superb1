const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.jsx', 'utf8');

const missingCode = `
          <button type="submit" disabled={saving} className="bg-gradient-to-r from-primary to-orange-500 hover:from-primary-dark hover:to-primary text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2">
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                Save All Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/Settings.jsx', code + missingCode);

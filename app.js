// Configuration
const CONFIG = {
    SPREADSHEET_ID: '1KKDjCHKAMFccFzZokT9tzDm65ygOOj1PDQXFr2T9TaM',
    APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwaHAEhYMqVLmN_RYaol3S8Acjo5SF21zIzuZNCWMPEWPipVH2LGOBZVh1pV5mnwnbi/exec',
    SHEETS: {
        PRESENTATIONS: 'presentations',
        COMMENTS: 'comments'
    }
};

// Global state
let presentations = [];
let comments = [];
let currentFilter = 'all';
let searchTerm = '';

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // 검색
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        filterAndRenderCases();
    });

    // 새 사례 등록 버튼
    document.getElementById('add-case-btn').addEventListener('click', openAddModal);

    // 모달 외부 클릭 시 닫기
    document.getElementById('detail-modal').addEventListener('click', (e) => {
        if (e.target.id === 'detail-modal') closeDetailModal();
    });

    document.getElementById('add-modal').addEventListener('click', (e) => {
        if (e.target.id === 'add-modal') closeAddModal();
    });
}

// Load data from Google Sheets
async function loadData() {
    try {
        const presentationsUrl = `https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${CONFIG.SHEETS.PRESENTATIONS}`;
        const commentsUrl = `https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${CONFIG.SHEETS.COMMENTS}`;
        
        const [presResponse, commResponse] = await Promise.all([
            fetch(presentationsUrl),
            fetch(commentsUrl)
        ]);
        
        const presText = await presResponse.text();
        const commText = await commResponse.text();
        
        presentations = parseGoogleSheetsResponse(presText);
        comments = parseGoogleSheetsResponse(commText);
        
        buildFilters();
        renderCases();
        
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('cases-grid').classList.remove('hidden');
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('error').classList.remove('hidden');
    }
}

// Parse Google Sheets response
function parseGoogleSheetsResponse(text) {
    const jsonString = text.substring(47).slice(0, -2);
    const data = JSON.parse(jsonString);
    
    if (!data.table || !data.table.rows) return [];
    
    const cols = data.table.cols.map(col => col.label);
    const rows = data.table.rows;
    
    return rows.map(row => {
        const obj = {};
        row.c.forEach((cell, index) => {
            obj[cols[index]] = cell ? cell.v : null;
        });
        return obj;
    });
}

// Build AI tool filters
function buildFilters() {
    const aiTools = [...new Set(presentations.map(p => p.aiTool))].filter(Boolean);
    const container = document.getElementById('ai-filter-container');
    
    aiTools.forEach(tool => {
        const button = document.createElement('button');
        button.className = 'filter-btn px-6 py-3 rounded-full bg-white font-semibold text-slate-700 shadow-md hover:shadow-lg transition-all';
        button.textContent = tool;
        button.dataset.filter = tool;
        button.addEventListener('click', () => setFilter(tool, button));
        container.appendChild(button);
    });
}

// Set filter
function setFilter(filter, button) {
    currentFilter = filter;
    
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    
    filterAndRenderCases();
}

// Filter and render cases
function filterAndRenderCases() {
    let filtered = presentations;
    
    // Apply AI tool filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.aiTool === currentFilter);
    }
    
    // Apply search
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.title?.toLowerCase().includes(searchTerm) ||
            p.presenter?.toLowerCase().includes(searchTerm) ||
            p.aiTool?.toLowerCase().includes(searchTerm) ||
            p.description?.toLowerCase().includes(searchTerm)
        );
    }
    
    renderCases(filtered);
}

// Render cases
function renderCases(casesToRender = presentations) {
    const grid = document.getElementById('cases-grid');
    const noResults = document.getElementById('no-results');
    
    if (casesToRender.length === 0) {
        grid.classList.add('hidden');
        noResults.classList.remove('hidden');
        return;
    }
    
    grid.classList.remove('hidden');
    noResults.classList.add('hidden');
    grid.innerHTML = '';
    
    casesToRender.forEach((pres, index) => {
        const card = createCaseCard(pres, index);
        grid.appendChild(card);
    });
}

// Create case card
function createCaseCard(pres, index) {
    const card = document.createElement('div');
    card.className = 'card-interactive bg-white rounded-2xl p-6 shadow-lg fade-in-up';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const caseComments = comments.filter(c => c.presentationId == pres.id);
    
    card.innerHTML = `
        <div class="flex items-start justify-between mb-4">
            <div class="ai-badge text-white text-xs font-bold px-3 py-1 rounded-full">
                ${pres.aiTool || 'AI 도구'}
            </div>
            <div class="text-slate-400 text-sm">
                ${caseComments.length} 💬
            </div>
        </div>
        
        <h3 class="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
            ${pres.title}
        </h3>
        
        <p class="text-slate-600 text-sm mb-4 line-clamp-3">
            ${pres.description ? pres.description.split('\n\n')[0] : ''}
        </p>
        
        <div class="flex items-center justify-between pt-4 border-t border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    ${pres.presenter ? pres.presenter.charAt(0) : '?'}
                </div>
                <div>
                    <p class="text-sm font-bold text-slate-900">${pres.presenter}</p>
                    <p class="text-xs text-slate-500">${pres.team}</p>
                </div>
            </div>
            
            <button class="text-amber-500 hover:text-amber-600 transition-colors font-semibold text-sm">
                자세히 →
            </button>
        </div>
    `;
    
    card.addEventListener('click', () => openDetailModal(pres));
    
    return card;
}

// Open detail modal
function openDetailModal(pres) {
    const modal = document.getElementById('detail-modal');
    const modalContent = document.getElementById('modal-content');
    
    const caseComments = comments.filter(c => c.presentationId == pres.id);
    const descParts = pres.description ? pres.description.split('\n\n') : [];
    
    modalContent.innerHTML = `
        <div class="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-6 flex justify-between items-center rounded-t-2xl z-10">
            <h2 class="text-2xl font-display text-white">${pres.title}</h2>
            <button onclick="closeDetailModal()" class="text-white hover:text-amber-400 text-3xl leading-none transition-colors">&times;</button>
        </div>
        
        <div class="p-8">
            <!-- 발표자 정보 -->
            <div class="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200">
                <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    ${pres.presenter ? pres.presenter.charAt(0) : '?'}
                </div>
                <div class="flex-1">
                    <p class="text-lg font-bold text-slate-900">${pres.presenter}</p>
                    <p class="text-slate-600">${pres.team}</p>
                </div>
                <div class="ai-badge text-white font-bold px-4 py-2 rounded-full">
                    🤖 ${pres.aiTool}
                </div>
            </div>
            
            <!-- 내용 (3단계) -->
            <div class="space-y-6 mb-8">
                ${descParts[0] ? `
                <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                    <h3 class="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                        <span class="text-2xl">💡</span>
                        왜 했는지?
                    </h3>
                    <p class="text-slate-700 leading-relaxed">${descParts[0]}</p>
                </div>
                ` : ''}
                
                ${descParts[1] ? `
                <div class="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
                    <h3 class="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
                        <span class="text-2xl">🛠️</span>
                        무엇이 좋아졌는지?
                    </h3>
                    <p class="text-slate-700 leading-relaxed">${descParts[1]}</p>
                </div>
                ` : ''}
                
                ${descParts[2] ? `
                <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                    <h3 class="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                        <span class="text-2xl">✨</span>
                        어떤 결과로 이어졌는지?
                    </h3>
                    <p class="text-slate-700 leading-relaxed">${descParts[2]}</p>
                </div>
                ` : ''}
            </div>
            
            <!-- 자료 링크 -->
            <div class="mb-8">
                <a href="${pres.resourceUrl}" target="_blank" 
                   class="block bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 font-bold py-4 px-6 rounded-xl text-center transition-all shadow-lg hover:shadow-xl hover:scale-105">
                    📄 발표 자료 보기
                </a>
            </div>
            
            <!-- 댓글 섹션 -->
            <div class="border-t-2 border-slate-200 pt-8">
                <h3 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    💬 댓글
                    <span class="text-lg text-slate-500">(${caseComments.length})</span>
                </h3>
                
                <!-- 댓글 작성 -->
                <div class="bg-slate-50 rounded-xl p-6 mb-6">
                    <textarea 
                        id="comment-content"
                        class="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-amber-500 focus:outline-none transition-colors mb-3"
                        rows="3"
                        placeholder="댓글을 입력하세요..."
                    ></textarea>
                    <div class="flex gap-3">
                        <input 
                            id="comment-author"
                            type="text"
                            class="flex-1 border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-amber-500 focus:outline-none transition-colors"
                            placeholder="이름"
                        />
                        <button 
                            onclick="submitComment(${pres.id})"
                            class="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
                        >
                            💬 댓글 작성
                        </button>
                    </div>
                </div>
                
                <!-- 댓글 목록 -->
                <div class="space-y-4">
                    ${caseComments.length > 0 ? caseComments.map(comment => `
                        <div class="bg-white border-2 border-slate-100 rounded-xl p-5 hover:border-slate-200 transition-colors">
                            <div class="flex items-center justify-between mb-3">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        ${comment.author ? comment.author.charAt(0) : '?'}
                                    </div>
                                    <span class="font-bold text-slate-900">${comment.author}</span>
                                </div>
                                <span class="text-sm text-slate-500">${formatDate(comment.timestamp)}</span>
                            </div>
                            <p class="text-slate-700 leading-relaxed">${comment.content}</p>
                        </div>
                    `).join('') : '<p class="text-center text-slate-500 py-12 bg-slate-50 rounded-xl">아직 댓글이 없습니다. 첫 댓글을 남겨보세요! 💬</p>'}
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

// Close detail modal
function closeDetailModal() {
    document.getElementById('detail-modal').classList.add('hidden');
}

// Open add modal
function openAddModal() {
    document.getElementById('add-modal').classList.remove('hidden');
}

// Close add modal
function closeAddModal() {
    document.getElementById('add-modal').classList.add('hidden');
}

// Submit new case
async function submitCase() {
    const title = document.getElementById('new-title').value;
    const presenter = document.getElementById('new-presenter').value;
    const team = document.getElementById('new-team').value;
    const why = document.getElementById('new-why').value;
    const what = document.getElementById('new-what').value;
    const result = document.getElementById('new-result').value;
    const aiTool = document.getElementById('new-aiTool').value;
    const resourceUrl = document.getElementById('new-resourceUrl').value;
    
    if (!title || !presenter || !team || !why || !what || !result || !aiTool || !resourceUrl) {
        alert('모든 필드를 입력해주세요.');
        return;
    }
    
    const description = `${why}\n\n${what}\n\n${result}`;
    const resourceType = 'website';
    
    try {
        const params = new URLSearchParams({
            action: 'addPresentation',
            title, presenter, team, description, aiTool, resourceType, resourceUrl
        });
        
        const response = await fetch(`${CONFIG.APPS_SCRIPT_URL}?${params.toString()}`, {
            method: 'GET',
            redirect: 'follow'
        });
        
        const text = await response.text();
        const result = JSON.parse(text);
        
        if (result.success) {
            alert('✨ 새 사례가 등록되었습니다!');
            closeAddModal();
            await loadData();
        } else {
            alert('등록 실패: ' + (result.error || '알 수 없는 오류'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('등록 중 오류가 발생했습니다: ' + error.message);
    }
}

// Submit comment
async function submitComment(presentationId) {
    const content = document.getElementById('comment-content').value;
    const author = document.getElementById('comment-author').value;
    
    if (!content || !author) {
        alert('이름과 댓글 내용을 모두 입력해주세요.');
        return;
    }
    
    try {
        const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
            method: 'POST',
            redirect: 'follow',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({
                presentationId, author, content, type: 'comment'
            })
        });
        
        const text = await response.text();
        const result = JSON.parse(text);
        
        if (result.success) {
            comments.push(result.comment);
            const pres = presentations.find(p => p.id == presentationId);
            openDetailModal(pres);
            alert('💬 댓글이 등록되었습니다!');
        } else {
            alert('댓글 등록 실패: ' + (result.error || '알 수 없는 오류'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('댓글 등록 중 오류가 발생했습니다: ' + error.message);
    }
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
}

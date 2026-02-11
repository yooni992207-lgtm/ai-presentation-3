// Configuration
const CONFIG = {
    SPREADSHEET_ID: '1KKDjCHKAMFccFzZokT9tzDm65ygOOj1PDQXFr2T9TaM',
    APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwaHAEhYMqVLmN_RYaol3S8Acjo5SF21zIzuZNCWMPEWPipVH2LGOBZVh1pV5mnwnbi/exec',
    SHEETS: {
        PRESENTATIONS: 'presentations',
        COMMENTS: 'comments'
    }
};

// Resource type icons
const RESOURCE_ICONS = {
    'ppt': '📊',
    'website': '🌐',
    'confluence': '📝',
    'video': '🎥',
    'pdf': '📄',
    'notion': '📓'
};

// 배송지 아이콘 풀 (다양한 건축물들)
const DELIVERY_ICONS = ['🏢', '🏬', '🏪', '🏫', '🏛️', '🏗️', '🏤', '🏥', '🏦', '🏨', '🏩', '🏰', '⛪', '🕌'];

// 각 배송지에 고정된 아이콘 저장
const deliveryIconMap = {};

// Global state
let presentations = [];
let comments = [];
let visitedHouses = new Set(); // 방문한 배송지 추적
let currentFilter = 'all'; // 현재 활성화된 필터

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    setupEventListeners();
    loadVisitedHouses();
});

// Setup event listeners
function setupEventListeners() {
    const addButton = document.getElementById('add-case-btn');
    if (addButton) {
        addButton.addEventListener('click', openAddCaseModal);
    }

    // 검색 입력 이벤트
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterAndRenderCases(currentFilter, e.target.value);
        });
    }
}

// Load visited houses from localStorage
function loadVisitedHouses() {
    const saved = localStorage.getItem('visitedHouses');
    if (saved) {
        visitedHouses = new Set(JSON.parse(saved));
    }
}

// Save visited houses to localStorage
function saveVisitedHouses() {
    localStorage.setItem('visitedHouses', JSON.stringify([...visitedHouses]));
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
        renderCasesGrid();

        document.getElementById('loading').classList.add('hidden');
        document.getElementById('cases-grid').classList.remove('hidden');
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('error').classList.remove('hidden');
    }
}

// Parse Google Sheets JSON response
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

// Build dynamic filters based on AI tools in data
function buildFilters() {
    // AI 도구 목록 추출 (대소문자 무시하고 중복 제거)
    const aiTools = [...new Set(
        presentations
            .map(p => p.aiTool ? p.aiTool.trim() : null)
            .filter(tool => tool) // null/undefined 제거
    )];

    const container = document.getElementById('ai-filter-container');
    container.innerHTML = '';

    // "전체" 칩 추가
    const allChip = document.createElement('button');
    allChip.className = 'filter-chip text-white text-sm active';
    allChip.dataset.filter = 'all';
    allChip.textContent = '전체';
    allChip.addEventListener('click', () => filterByAI('all'));
    container.appendChild(allChip);

    // 각 AI 도구별 칩 추가
    aiTools.sort().forEach(tool => {
        const chip = document.createElement('button');
        chip.className = 'filter-chip text-white text-sm';
        chip.dataset.filter = tool.toLowerCase();
        chip.textContent = tool;
        chip.addEventListener('click', () => filterByAI(tool));
        container.appendChild(chip);
    });
}

// Filter by AI tool
function filterByAI(aiTool) {
    currentFilter = aiTool;

    // 필터 칩 active 상태 업데이트
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.classList.remove('active');
        if (aiTool === 'all' && chip.dataset.filter === 'all') {
            chip.classList.add('active');
        } else if (chip.textContent === aiTool) {
            chip.classList.add('active');
        }
    });

    // 검색어도 함께 적용
    const searchInput = document.getElementById('search-input');
    const searchQuery = searchInput ? searchInput.value : '';
    filterAndRenderCases(aiTool, searchQuery);
}

// Filter and render cases based on AI tool and search query
function filterAndRenderCases(aiTool, searchQuery = '') {
    const container = document.getElementById('cases-grid');
    container.innerHTML = '';

    // 필터링
    let filteredPresentations = presentations;

    // AI 도구 필터 (대소문자 무시)
    if (aiTool !== 'all') {
        filteredPresentations = filteredPresentations.filter(p =>
            p.aiTool && p.aiTool.toLowerCase() === aiTool.toLowerCase()
        );
    }

    // 검색 필터
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filteredPresentations = filteredPresentations.filter(p =>
            (p.title && p.title.toLowerCase().includes(query)) ||
            (p.description && p.description.toLowerCase().includes(query)) ||
            (p.presenter && p.presenter.toLowerCase().includes(query)) ||
            (p.team && p.team.toLowerCase().includes(query))
        );
    }

    // 렌더링
    if (filteredPresentations.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-20">
                <div class="text-6xl mb-4">🔍</div>
                <p class="text-purple-200 text-lg">검색 결과가 없습니다.</p>
                <p class="text-purple-300 mt-2 text-sm">다른 검색어나 필터를 시도해보세요.</p>
            </div>
        `;
    } else {
        filteredPresentations.forEach((pres, index) => {
            const card = createCaseCard(pres, index);
            container.appendChild(card);
        });
    }
}

// Render cases grid
function renderCasesGrid() {
    filterAndRenderCases(currentFilter);
}

// Create case card - 글래스모피즘 스타일
function createCaseCard(pres, index) {
    const card = document.createElement('div');
    card.className = 'glass-card cursor-pointer overflow-hidden';

    const caseComments = comments.filter(c => c.presentationId == pres.id);

    card.innerHTML = `
        <!-- 카드 헤더 - 보라색 그라데이션 + 반짝이는 별 -->
        <div class="card-header flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="sparkle">✨</span>
                <span class="sparkle">✨</span>
                <span class="sparkle">✨</span>
            </div>
            <span class="badge text-white text-xs">${pres.aiTool || 'AI'}</span>
        </div>

        <!-- 카드 바디 - 투명 배경 -->
        <div class="p-5">
            <h3 class="text-lg font-bold text-white mb-2 line-clamp-2">${pres.title}</h3>

            <div class="flex items-center gap-2 text-sm text-purple-200 mb-3">
                <span>${pres.presenter}</span>
                <span>·</span>
                <span>${pres.team}</span>
            </div>

            <!-- 썸네일 이미지 -->
            <div class="mb-4 rounded-lg overflow-hidden bg-white/5">
                <img
                    src="https://api.microlink.io/?url=${encodeURIComponent(pres.resourceUrl)}&screenshot=true&meta=false&embed=screenshot.url"
                    alt="${pres.title} 썸네일"
                    class="w-full h-40 object-cover"
                    onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect width=%22400%22 height=%22200%22 fill=%22%23672091%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2220%22 fill=%22white%22%3E${encodeURIComponent(pres.title)}%3C/text%3E%3C/svg%3E';"
                />
            </div>

            <!-- 댓글 수 표시 -->
            ${caseComments.length > 0 ? `
                <div class="flex items-center gap-1 text-purple-300 text-sm">
                    <span>💬</span>
                    <span>${caseComments.length}개의 댓글</span>
                </div>
            ` : ''}
        </div>
    `;

    card.addEventListener('click', () => openCaseModal(pres));

    return card;
}

// Open case modal
function openCaseModal(pres) {
    const modal = document.getElementById('case-modal');
    const modalContent = document.getElementById('modal-content');
    
    const presComments = comments.filter(c => c.presentationId == pres.id);

    modalContent.innerHTML = `
        <div class="card-header sticky top-0 flex justify-between items-center z-10">
            <h2 class="text-xl font-bold text-white flex items-center gap-2">
                <span class="sparkle">✨</span>
                <span class="sparkle">✨</span>
                <span class="sparkle">✨</span>
                ${pres.title}
            </h2>
            <button onclick="closeCaseModal()" class="text-white hover:text-purple-200 text-3xl leading-none">&times;</button>
        </div>

        <div class="p-6">
            <!-- 사례 정보 -->
            <div class="glass-card p-5 mb-6">
                <div class="flex items-center justify-between mb-4">
                    <span class="badge text-white">${pres.aiTool}</span>
                    <div class="text-sm text-purple-200">
                        <span>${pres.presenter}</span> · <span>${pres.team}</span>
                    </div>
                </div>

                <!-- 설명 (3단계) -->
                <div class="space-y-3">
                    <div class="glass-card p-4">
                        <p class="text-sm font-bold text-purple-300 mb-2">💡 왜 했는지?</p>
                        <p class="text-white whitespace-pre-line">${pres.description ? pres.description.split('\n\n')[0] || pres.description : ''}</p>
                    </div>

                    ${pres.description && pres.description.includes('\n\n') ? `
                    <div class="glass-card p-4">
                        <p class="text-sm font-bold text-purple-300 mb-2">🛠️ 무엇이 좋아졌는지?</p>
                        <p class="text-white whitespace-pre-line">${pres.description.split('\n\n')[1] || ''}</p>
                    </div>
                    ` : ''}

                    ${pres.description && pres.description.split('\n\n').length > 2 ? `
                    <div class="glass-card p-4">
                        <p class="text-sm font-bold text-purple-300 mb-2">✨ 어떤 결과로 이어졌는지?</p>
                        <p class="text-white whitespace-pre-line">${pres.description.split('\n\n')[2] || ''}</p>
                    </div>
                    ` : ''}
                </div>
            </div>

            <!-- 자료 링크 -->
            <div class="mb-6">
                <a href="${pres.resourceUrl}" target="_blank"
                   class="purple-gradient-btn block text-white font-bold py-4 px-6 rounded-xl text-center">
                    ${RESOURCE_ICONS[pres.resourceType]} 자료 보기
                </a>
            </div>

            <!-- 댓글 -->
            <div class="border-t border-white/10 pt-6">
                <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    💬 댓글
                    <span class="text-sm text-purple-300">(${presComments.length})</span>
                </h3>

                <!-- 댓글 작성 폼 -->
                <div class="glass-card p-4 mb-6">
                    <textarea
                        id="comment-content"
                        class="glass-search w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 mb-2"
                        rows="3"
                        placeholder="댓글을 남겨주세요..."
                    ></textarea>
                    <div class="flex items-center gap-2">
                        <input
                            id="comment-author"
                            type="text"
                            class="glass-search flex-1 px-4 py-2 rounded-lg text-white placeholder-gray-400"
                            placeholder="이름"
                        />
                        <button
                            onclick="submitComment(${pres.id})"
                            class="purple-gradient-btn text-white font-bold py-2 px-6 rounded-lg whitespace-nowrap"
                        >
                            💬 댓글 남기기
                        </button>
                    </div>
                </div>

                <!-- 댓글 목록 -->
                <div class="space-y-3">
                    ${presComments.length > 0 ? presComments.map(comment => `
                        <div class="glass-card p-4">
                            <div class="flex items-center justify-between mb-2">
                                <span class="font-bold text-white">${comment.author}</span>
                                <span class="text-sm text-purple-300">${formatDate(comment.timestamp)}</span>
                            </div>
                            <p class="text-gray-300">${comment.content}</p>
                        </div>
                    `).join('') : '<p class="text-center text-purple-300 py-8 glass-card">아직 댓글이 없습니다. 첫 댓글을 남겨보세요! 💬</p>'}
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

// Close case modal
function closeCaseModal() {
    document.getElementById('case-modal').classList.add('hidden');
}

// Close add case modal
function closeAddCaseModal() {
    document.getElementById('add-case-modal').classList.add('hidden');
}

// Open add case modal
function openAddCaseModal() {
    document.getElementById('add-case-modal').classList.remove('hidden');
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
    
    // 설명을 3단계로 합침 (\n\n로 구분)
    const description = `${why}\n\n${what}\n\n${result}`;
    
    // resourceType 자동 결정
    const resourceType = 'website'; // 기본값
    
    try {
        const params = new URLSearchParams({
            action: 'addPresentation',
            title: title,
            presenter: presenter,
            team: team,
            description: description,
            aiTool: aiTool,
            resourceType: resourceType,
            resourceUrl: resourceUrl
        });
        
        const response = await fetch(`${CONFIG.APPS_SCRIPT_URL}?${params.toString()}`, {
            method: 'GET',
            redirect: 'follow'
        });
        
        const text = await response.text();
        const result = JSON.parse(text);
        
        if (result.success) {
            alert('✨ 새 사례가 등록되었습니다!');
            closeAddCaseModal();
            currentFilter = 'all'; // 필터 초기화
            await loadData();
        } else {
            alert('등록 실패: ' + (result.error || '알 수 없는 오류'));
        }
    } catch (error) {
        console.error('Error submitting case:', error);
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
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({
                presentationId: presentationId,
                author: author,
                content: content,
                type: 'comment'
            })
        });
        
        const text = await response.text();
        const result = JSON.parse(text);
        
        if (result.success) {
            comments.push(result.comment);
            const pres = presentations.find(p => p.id == presentationId);
            openCaseModal(pres);
            alert('💬 댓글이 등록되었습니다!');
        } else {
            alert('댓글 등록 실패: ' + (result.error || '알 수 없는 오류'));
        }
    } catch (error) {
        console.error('Error submitting comment:', error);
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

// Close modal when clicking outside
document.getElementById('case-modal').addEventListener('click', (e) => {
    if (e.target.id === 'case-modal') {
        closeCaseModal();
    }
});

document.getElementById('add-case-modal').addEventListener('click', (e) => {
    if (e.target.id === 'add-case-modal') {
        closeAddCaseModal();
    }
});

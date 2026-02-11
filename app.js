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

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    setupEventListeners();
    loadVisitedHouses();
});

// Setup event listeners
function setupEventListeners() {
    const addButton = document.getElementById('add-delivery-btn');
    if (addButton) {
        addButton.addEventListener('click', openAddDeliveryModal);
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
        
        renderDeliveryMap();
        
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('delivery-map').classList.remove('hidden');
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

// Render delivery map
function renderDeliveryMap() {
    const container = document.getElementById('houses-container');
    container.innerHTML = '';
    container.style.position = 'relative';
    container.style.width = '100%';
    container.style.minHeight = '600px';
    
    presentations.forEach((pres, index) => {
        const spot = createDeliverySpot(pres, index);
        container.appendChild(spot);
    });
}

// Create delivery spot (배송지) - 무작위 배치
function createDeliverySpot(pres, index) {
    const spot = document.createElement('div');
    const isVisited = visitedHouses.has(pres.id.toString());
    const spotComments = comments.filter(c => c.presentationId == pres.id);
    
    // 고정된 아이콘 할당 (없으면 새로 생성)
    if (!deliveryIconMap[pres.id]) {
        deliveryIconMap[pres.id] = DELIVERY_ICONS[Math.floor(Math.random() * DELIVERY_ICONS.length)];
    }
    const icon = deliveryIconMap[pres.id];
    
    // 무작위 위치 계산 (겹치지 않도록)
    const positions = [
        { top: '10%', left: '15%' },
        { top: '25%', left: '70%' },
        { top: '15%', left: '45%' },
        { top: '40%', left: '25%' },
        { top: '35%', left: '80%' },
        { top: '55%', left: '15%' },
        { top: '50%', left: '55%' },
        { top: '65%', left: '35%' },
        { top: '70%', left: '75%' },
        { top: '20%', left: '85%' },
        { top: '45%', left: '5%' },
        { top: '75%', left: '10%' },
    ];
    
    const position = positions[index % positions.length];
    
    spot.className = `delivery-spot absolute ${isVisited ? 'delivery-visited' : 'delivery-unvisited'}`;
    spot.style.top = position.top;
    spot.style.left = position.left;
    spot.style.zIndex = '5';
    
    spot.innerHTML = `
        <div class="delivery-icon">${icon}</div>
        
        <!-- 툴팁 -->
        <div class="delivery-tooltip">
            <div class="font-bold text-gray-800">${pres.title}</div>
            <div class="text-gray-600 text-xs">${pres.presenter} · ${pres.team}</div>
        </div>
        
        <!-- 택배상자 쌓임 -->
        ${spotComments.length > 0 ? `
            <div class="boxes-stack">
                ${spotComments.map((_, i) => {
                    const rotation = (Math.random() - 0.5) * 30;
                    const offsetX = (Math.random() - 0.5) * 15;
                    const offsetY = Math.random() * 8;
                    return `<span class="box" style="--rotate: ${rotation}deg; --offset-x: ${offsetX}px; --offset-y: ${offsetY}px;">📦</span>`;
                }).join('')}
            </div>
        ` : ''}
    `;
    
    spot.addEventListener('click', () => openDeliveryModal(pres));
    
    return spot;
}

// Open delivery modal
function openDeliveryModal(pres) {
    // 방문 처리
    visitedHouses.add(pres.id.toString());
    saveVisitedHouses();
    
    const modal = document.getElementById('delivery-modal');
    const modalContent = document.getElementById('modal-content');
    
    const presComments = comments.filter(c => c.presentationId == pres.id);
    
    modalContent.innerHTML = `
        <div class="sticky top-0 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl z-10">
            <h2 class="text-2xl font-bold flex items-center gap-2">
                <span class="text-3xl">🏡</span>
                배송 완료!
            </h2>
            <button onclick="closeDeliveryModal()" class="text-white hover:text-yellow-200 text-3xl">&times;</button>
        </div>
        
        <div class="p-6">
            <!-- 배송물 정보 -->
            <div class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-5 mb-6 border-2 border-yellow-200">
                <h3 class="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    📦 ${pres.title}
                </h3>
                
                <!-- 사용 AI 도구 (위로 이동) -->
                <div class="mb-4 bg-white rounded-lg p-3 border border-purple-200">
                    <p class="text-sm text-gray-600 mb-1">🤖 사용 AI 도구</p>
                    <p class="text-gray-800 font-bold text-lg">${pres.aiTool}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p class="text-sm text-gray-600">발송인</p>
                        <p class="font-bold text-gray-800">${pres.presenter}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">소속</p>
                        <p class="font-bold text-gray-800">${pres.team}</p>
                    </div>
                </div>
                
                <!-- 내용물 설명 (3단계) -->
                <div class="space-y-3">
                    <div class="bg-white rounded-lg p-3 border border-blue-200">
                        <p class="text-sm font-bold text-blue-600 mb-2">💡 왜 했는지?</p>
                        <p class="text-gray-700 whitespace-pre-line">${pres.description ? pres.description.split('\n\n')[0] || pres.description : ''}</p>
                    </div>
                    
                    ${pres.description && pres.description.includes('\n\n') ? `
                    <div class="bg-white rounded-lg p-3 border border-purple-200">
                        <p class="text-sm font-bold text-purple-600 mb-2">🛠️ 무엇이 좋아졌는지?</p>
                        <p class="text-gray-700 whitespace-pre-line">${pres.description.split('\n\n')[1] || ''}</p>
                    </div>
                    ` : ''}
                    
                    ${pres.description && pres.description.split('\n\n').length > 2 ? `
                    <div class="bg-white rounded-lg p-3 border border-green-200">
                        <p class="text-sm font-bold text-green-600 mb-2">✨ 어떤 결과로 이어졌는지?</p>
                        <p class="text-gray-700 whitespace-pre-line">${pres.description.split('\n\n')[2] || ''}</p>
                    </div>
                    ` : ''}
                </div>
            </div>
            
            <!-- 배송 명세서 -->
            <div class="mb-6">
                <a href="${pres.resourceUrl}" target="_blank" 
                   class="block bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl text-center transition shadow-lg">
                    ${RESOURCE_ICONS[pres.resourceType]} 배송 명세서 보기
                </a>
                <p class="text-center text-xs text-gray-500 mt-2">문 앞에 안전하게 놓아두었습니다 😊</p>
            </div>
            
            <!-- 배송 후기 (댓글) -->
            <div class="border-t-2 border-purple-200 pt-6">
                <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                    💬 댓글
                    <span class="text-sm text-gray-600">(${presComments.length})</span>
                </h3>
                
                <!-- 댓글 작성 폼 (유형 선택 제거) -->
                <div class="bg-purple-50 rounded-xl p-4 mb-6">
                    <textarea 
                        id="comment-content"
                        class="w-full border-2 border-purple-200 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2"
                        rows="3"
                        placeholder="댓글을 남겨주세요..."
                    ></textarea>
                    <div class="flex items-center gap-2">
                        <input 
                            id="comment-author"
                            type="text"
                            class="flex-1 border-2 border-purple-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="이름"
                        />
                        <button 
                            onclick="submitComment(${pres.id})"
                            class="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition whitespace-nowrap shadow-lg"
                        >
                            💬 댓글 남기기
                        </button>
                    </div>
                </div>
                
                <!-- 댓글 목록 (유형 배지 제거) -->
                <div class="space-y-3">
                    ${presComments.length > 0 ? presComments.map(comment => `
                        <div class="bg-white rounded-lg p-4 shadow-md border-2 border-purple-100">
                            <div class="flex items-center justify-between mb-2">
                                <span class="font-bold text-gray-800">${comment.author}</span>
                                <span class="text-sm text-gray-500">${formatDate(comment.timestamp)}</span>
                            </div>
                            <p class="text-gray-700">${comment.content}</p>
                        </div>
                    `).join('') : '<p class="text-center text-gray-500 py-8 bg-white rounded-lg">아직 댓글이 없습니다. 첫 댓글을 남겨보세요! 💬</p>'}
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    
    // 지도 업데이트 (배송 완료 표시)
    renderDeliveryMap();
}

// Close delivery modal
function closeDeliveryModal() {
    document.getElementById('delivery-modal').classList.add('hidden');
}

// Close add delivery modal
function closeAddDeliveryModal() {
    document.getElementById('add-delivery-modal').classList.add('hidden');
}

// Open add delivery modal
function openAddDeliveryModal() {
    document.getElementById('add-delivery-modal').classList.remove('hidden');
}

// Submit new delivery
async function submitDelivery() {
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
            alert('🚚 새 배송지가 등록되었습니다!');
            closeAddDeliveryModal();
            await loadData();
        } else {
            alert('등록 실패: ' + (result.error || '알 수 없는 오류'));
        }
    } catch (error) {
        console.error('Error submitting delivery:', error);
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
            openDeliveryModal(pres);
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
document.getElementById('delivery-modal').addEventListener('click', (e) => {
    if (e.target.id === 'delivery-modal') {
        closeDeliveryModal();
    }
});

document.getElementById('add-delivery-modal').addEventListener('click', (e) => {
    if (e.target.id === 'add-delivery-modal') {
        closeAddDeliveryModal();
    }
});

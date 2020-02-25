<div className="container">
  <div className="tabs-main">
    <ul className="tabs">
      <li className={currentTab === 1 ? 'active' : ''}><a href="#main-tab-1" className="u-unstyledLink" onClick={e => this.switchTab(e, 1)}>#Tab#</a></li>
      <li className={currentTab === 2 ? 'active' : ''}><a href="#main-tab-2" className="u-unstyledLink" onClick={e => this.switchTab(e, 2)}>#Tab#</a></li>
      <li className={currentTab === 3 ? 'active' : ''}><a href="#main-tab-3" className="u-unstyledLink" onClick={e => this.switchTab(e, 3)}>#Tab#</a></li>
      <li className={currentTab === 4 ? 'active' : ''}><a href="#main-tab-4" className="u-unstyledLink" onClick={e => this.switchTab(e, 4)}>#Tab#</a></li>
      <li className={currentTab === 5 ? 'active' : ''}><a href="#main-tab-5" className="u-unstyledLink" onClick={e => this.switchTab(e, 5)}>#Tab#</a></li>
    </ul>
  </div> 
  <div className="tab-content">
    <div id="main-tab-1" className={currentTab === 1 ? 'show' : ''}><Tab1 accountId={accountId} /></div>
    <div id="main-tab-2" className={currentTab === 2 ? 'show' : ''}><Tab2 accountId={accountId} /></div>
    <div id="main-tab-3" className={currentTab === 3 ? 'show' : ''}><Tab3 accountId={accountId} /></div>
    <div id="main-tab-4" className={currentTab === 4 ? 'show' : ''}><Tab4 accountId={accountId} /></div>
    <div id="main-tab-5" className={currentTab === 5 ? 'show' : ''}><Tab5 accountId={accountId} /></div>
  </div>
</div>

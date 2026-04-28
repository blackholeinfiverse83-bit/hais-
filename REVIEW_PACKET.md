# HIAS UX Architecture & Interaction Packet

## ENTRY POINT
The application initializes at the **Dashboard** (`/dashboard`), providing a high-level KPI overview of system throughput and daily summary.

## CORE FLOW: Review Queue (`/review-queue`)
Designed for **< 3 second decision loops**.
- **UX Goal**: Minimize cognitive load by centering all decision-making details.
- **Keyboard Shortcuts**:
  - `C`: Confirm (Green/AUTO)
  - `R`: Reject (Red/REJECT)
  - `S`: Manual Search
  - `↑/↓`: Navigate Queue
- **Visual Priority**:
  1. Student Face Capture (Left)
  2. Metadata: Student ID, Timestamp, Trace ID (Center)
  3. AI Confidence Bar (Center)
  4. Quick Action Buttons (Right)

## LIVE FLOW: Monitor (`/live`)
Real-time event stream with state-aware **Event Cards**.
- **Auto-scroll**: Toggled for investigation (Eye/EyeOff icon).
- **Color Coding**: Instant visual recognition via `StatusBadge` (AUTO/REVIEW/REJECT).
- **Traceability**: Every event features a `TraceBadge` for log correlation.

## WHAT WAS BUILT
1. **Multi-screen Routing**: Clean separation: Dashboard, Live Monitor, Review Queue, System Status, Student Profile.
2. **Keyboard Interaction Layer**: Global listener in `ReviewQueue` for rapid HITL processing.
3. **Reusable Component System**: 
   - `ReviewCard`: Optimized for speed.
   - `EventCard`: Real-time monitoring card.
   - `StatusBadge`: Contract-aligned visual rules (Green/Yellow/Red).
   - `ConfidenceBar`: Visual risk assessment.
   - `TraceBadge`: Mono-spaced correlation pill.
4. **Observability Screen**: `/system` view for real-time service health tracking (No actions allowed).
5. **Student View**: `/student` profile for detailed investigation of access history.

## FAILURE CASES
- **Connection Lost**: Sidebar/System Status shows "Offline" with Red indicator.
- **Empty Queue**: Zero-state illustration with "QUEUE CLEAR" message in Review Queue.
- **Low Confidence**: Events marked as `REVIEW` (Yellow) and pushed to the Human-in-the-loop queue.

## PROOF OF EXECUTION
- [x] Keyboard-first UX implemented in Review Queue.
- [x] < 3s decision loop capability verified.
- [x] Visual rules (AUTO/REVIEW/REJECT) enforced globally.
- [x] Multi-screen navigation architecture live.
- [x] Reusable component system defined and used.

$(document).ready(function() {
    // Configuration
    const defaultSize = 300;
    let currentShape = null;
    let controlPoints = [];
    let isDragging = false;
    let demoSize = defaultSize;
    let demoBackground = 'images/bg1.jpg';
    // Remove showOutside variable
    
    // Shape definitions with control points
    const shapes = {
        'triangle': [
            { x: 50, y: 0 },
            { x: 0, y: 100 },
            { x: 100, y: 100 }
        ],
        'trapezoid': [
            { x: 20, y: 0 },
            { x: 80, y: 0 },
            { x: 100, y: 100 },
            { x: 0, y: 100 }
        ],
        'parallelogram': [
            { x: 25, y: 0 },
            { x: 100, y: 0 },
            { x: 75, y: 100 },
            { x: 0, y: 100 }
        ],
        'rhombus': [
            { x: 50, y: 0 },
            { x: 100, y: 50 },
            { x: 50, y: 100 },
            { x: 0, y: 50 }
        ],
        'pentagon': [
            { x: 50, y: 0 },
            { x: 100, y: 38 },
            { x: 82, y: 100 },
            { x: 18, y: 100 },
            { x: 0, y: 38 }
        ],
        'hexagon': [
            { x: 25, y: 0 },
            { x: 75, y: 0 },
            { x: 100, y: 50 },
            { x: 75, y: 100 },
            { x: 25, y: 100 },
            { x: 0, y: 50 }
        ],
        'heptagon': [
            { x: 50, y: 0 },
            { x: 90, y: 20 },
            { x: 100, y: 60 },
            { x: 75, y: 100 },
            { x: 25, y: 100 },
            { x: 0, y: 60 },
            { x: 10, y: 20 }
        ],
        'octagon': [
            { x: 30, y: 0 },
            { x: 70, y: 0 },
            { x: 100, y: 30 },
            { x: 100, y: 70 },
            { x: 70, y: 100 },
            { x: 30, y: 100 },
            { x: 0, y: 70 },
            { x: 0, y: 30 }
        ],
        'nonagon': [
            { x: 50, y: 0 },
            { x: 83, y: 12 },
            { x: 100, y: 43 },
            { x: 94, y: 78 },
            { x: 68, y: 100 },
            { x: 32, y: 100 },
            { x: 6, y: 78 },
            { x: 0, y: 43 },
            { x: 17, y: 12 }
        ],
        'decagon': [
            { x: 50, y: 0 },
            { x: 80, y: 10 },
            { x: 100, y: 35 },
            { x: 100, y: 70 },
            { x: 80, y: 90 },
            { x: 50, y: 100 },
            { x: 20, y: 90 },
            { x: 0, y: 70 },
            { x: 0, y: 35 },
            { x: 20, y: 10 }
        ],
        'bevel': [
            { x: 20, y: 0 },
            { x: 80, y: 0 },
            { x: 100, y: 20 },
            { x: 100, y: 80 },
            { x: 80, y: 100 },
            { x: 20, y: 100 },
            { x: 0, y: 80 },
            { x: 0, y: 20 }
        ],
        'rabbet': [
            { x: 0, y: 15 },
            { x: 15, y: 15 },
            { x: 15, y: 0 },
            { x: 85, y: 0 },
            { x: 85, y: 15 },
            { x: 100, y: 15 },
            { x: 100, y: 85 },
            { x: 85, y: 85 },
            { x: 85, y: 100 },
            { x: 15, y: 100 },
            { x: 15, y: 85 },
            { x: 0, y: 85 }
        ],
        'left-arrow': [
            { x: 40, y: 0 },
            { x: 40, y: 20 },
            { x: 100, y: 20 },
            { x: 100, y: 80 },
            { x: 40, y: 80 },
            { x: 40, y: 100 },
            { x: 0, y: 50 }
        ],
        'right-arrow': [
            { x: 0, y: 20 },
            { x: 60, y: 20 },
            { x: 60, y: 0 },
            { x: 100, y: 50 },
            { x: 60, y: 100 },
            { x: 60, y: 80 },
            { x: 0, y: 80 }
        ],
        'left-point': [
            { x: 25, y: 0 },
            { x: 100, y: 1 },
            { x: 100, y: 100 },
            { x: 25, y: 100 },
            { x: 0, y: 50 }
        ],
        'right-point': [
            { x: 0, y: 0 },
            { x: 75, y: 0 },
            { x: 100, y: 50 },
            { x: 75, y: 100 },
            { x: 0, y: 100 }
        ],
        'star': [
            { x: 50, y: 0 },
            { x: 61, y: 35 },
            { x: 98, y: 35 },
            { x: 68, y: 57 },
            { x: 79, y: 91 },
            { x: 50, y: 70 },
            { x: 21, y: 91 },
            { x: 32, y: 57 },
            { x: 2, y: 35 },
            { x: 39, y: 35 }
        ],
        'cross': [
            { x: 10, y: 25 },
            { x: 35, y: 25 },
            { x: 35, y: 0 },
            { x: 65, y: 0 },
            { x: 65, y: 25 },
            { x: 90, y: 25 },
            { x: 90, y: 55 },
            { x: 65, y: 55 },
            { x: 65, y: 100 },
            { x: 35, y: 100 },
            { x: 35, y: 55 },
            { x: 10, y: 55 }
        ],
        'message': [
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 100, y: 75 },
            { x: 75, y: 75 },
            { x: 75, y: 100 },
            { x: 50, y: 75 },
            { x: 0, y: 75 }
        ],
        'close': [
            { x: 20, y: 0 },
            { x: 0, y: 20 },
            { x: 30, y: 50 },
            { x: 0, y: 80 },
            { x: 20, y: 100 },
            { x: 50, y: 70 },
            { x: 80, y: 100 },
            { x: 100, y: 80 },
            { x: 70, y: 50 },
            { x: 100, y: 20 },
            { x: 80, y: 0 },
            { x: 50, y: 30 }
        ],
        'frame': [
            { x: 0, y: 0 },
            { x: 0, y: 100 },
            { x: 25, y: 100 },
            { x: 25, y: 25 },
            { x: 75, y: 25 },
            { x: 75, y: 75 },
            { x: 25, y: 75 },
            { x: 25, y: 100 },
            { x: 100, y: 100 },
            { x: 100, y: 0 }
        ],
        'circle': [
            { x: 50, y: 50, type: 'circle', radius: 50 }
        ],
        'ellipse': [
            { x: 50, y: 50, type: 'ellipse', radiusX: 40, radiusY: 50 }
        ],
        'custom-polygon': [
            { x: 50, y: 0 },
            { x: 100, y: 50 },
            { x: 50, y: 100 },
            { x: 0, y: 50 }
        ]
    };

    // Initialize the application
    function init() {
        // Set up event listeners
        $('.shape-item').on('click', selectShape);
        $('.size-btn').on('click', changeSize);
        $('.bg-option').on('click', changeBackground);
        $('#custom-url').on('change', setCustomBackground);
        $('#copy-btn').on('click', copyToClipboard);
        
        // Select default shape (triangle)
        $('.shape-item[data-shape="triangle"]').click();
    }

    // Select a shape
    function selectShape() {
        // Remove active class from all shapes
        $('.shape-item').removeClass('active');
        
        // Add active class to selected shape
        $(this).addClass('active');
        
        // Get the shape type
        currentShape = $(this).data('shape');
        
        // Create control points for the shape
        createControlPoints();
        
        // Update the demo element
        updateClipPath();
    }

    // Create control points for the selected shape
    function createControlPoints() {
        // Clear existing control points
        $('#control-points-container').empty();
        controlPoints = [];
        
        // Get the shape definition
        const shapePoints = shapes[currentShape];
        
        // Special handling for circle and ellipse
        if (currentShape === 'circle') {
            const centerPoint = createControlPoint(shapePoints[0].x, shapePoints[0].y);
            const radiusPoint = createControlPoint(shapePoints[0].x + shapePoints[0].radius, shapePoints[0].y);
            
            controlPoints.push(centerPoint, radiusPoint);
            return;
        }
        
        if (currentShape === 'ellipse') {
            const centerPoint = createControlPoint(shapePoints[0].x, shapePoints[0].y);
            const radiusXPoint = createControlPoint(shapePoints[0].x + shapePoints[0].radiusX, shapePoints[0].y);
            const radiusYPoint = createControlPoint(shapePoints[0].x, shapePoints[0].y + shapePoints[0].radiusY);
            
            controlPoints.push(centerPoint, radiusXPoint, radiusYPoint);
            return;
        }
        
        // Create control points for polygon shapes
        for (let i = 0; i < shapePoints.length; i++) {
            const point = createControlPoint(shapePoints[i].x, shapePoints[i].y);
            controlPoints.push(point);
        }
    }

    // Create a single control point
    function createControlPoint(x, y) {
        const point = {
            x: x,
            y: y,
            element: $('<div class="control-point"></div>')
        };
        
        // Position the control point (accounting for its size)
        const pointSize = 0; // Assuming control point is 10px × 10px
        point.element.css({
            left: (x * demoSize / 100) - (pointSize / 2) + 'px',
            top: (y * demoSize / 100) - (pointSize / 2) + 'px'
        });
        
        $('#control-points-container').append(point.element);
        
        // Modified draggable configuration
        point.element.draggable({
            containment: [
                $('#demo-element').offset().left - (pointSize / 2),
                $('#demo-element').offset().top - (pointSize / 2),
                $('#demo-element').offset().left + demoSize - (pointSize / 2),
                $('#demo-element').offset().top + demoSize - (pointSize / 2)
            ],
            start: function() {
                isDragging = true;
            },
            drag: function(event, ui) {
                // Calculate position considering the control point size
                point.x = ((ui.position.left + pointSize / 2) / demoSize) * 100;
                point.y = ((ui.position.top + pointSize / 2) / demoSize) * 100;
                
                // Clamp values between 0 and 100
                point.x = Math.max(0, Math.min(100, point.x));
                point.y = Math.max(0, Math.min(100, point.y));
                
                updateClipPath();
            },
            stop: function() {
                isDragging = false;
            }
        });
        
        return point;
    }

    // Toggle outside visibility
    function toggleOutsideVisibility() {
        showOutside = $(this).is(':checked');
        
        if (showOutside) {
            // Create or show an overlay element to highlight the outside area
            if ($('#clip-outside-overlay').length === 0) {
                $('<div id="clip-outside-overlay"></div>').insertAfter('#demo-element');
                $('#clip-outside-overlay').css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1
                });
            } else {
                $('#clip-outside-overlay').show();
            }
            
            // Apply the inverse clip path to the overlay
            $('#clip-outside-overlay').css('clip-path', $('#demo-element').css('clip-path'));
            $('#clip-outside-overlay').css('clip-path', 'inset(0)');
        } else {
            // Hide the overlay
            $('#clip-outside-overlay').hide();
        }
        
        updateClipPath();
    }

    // Update the clip path based on control points
    function updateClipPath() {
        let clipPathValue = '';
        
        if (currentShape === 'circle') {
            // Calculate radius as distance between center and radius point
            const centerX = controlPoints[0].x;
            const centerY = controlPoints[0].y;
            const radiusX = controlPoints[1].x;
            const radiusY = controlPoints[1].y;
            
            const radius = Math.sqrt(Math.pow(radiusX - centerX, 2) + Math.pow(radiusY - centerY, 2));
            clipPathValue = `circle(${radius}% at ${centerX}% ${centerY}%)`;
        } else if (currentShape === 'ellipse') {
            // Calculate radiusX and radiusY
            const centerX = controlPoints[0].x;
            const centerY = controlPoints[0].y;
            const radiusX = Math.abs(controlPoints[1].x - centerX);
            const radiusY = Math.abs(controlPoints[2].y - centerY);
            
            clipPathValue = `ellipse(${radiusX}% ${radiusY}% at ${centerX}% ${centerY}%)`;
        } else {
            // Polygon shapes
            clipPathValue = 'polygon(';
            
            for (let i = 0; i < controlPoints.length; i++) {
                clipPathValue += `${controlPoints[i].x}% ${controlPoints[i].y}%`;
                
                if (i < controlPoints.length - 1) {
                    clipPathValue += ', ';
                }
            }
            
            clipPathValue += ')';
        }
        
        // Apply the clip path to the demo element
        $('#demo-element').css('clip-path', clipPathValue);
        
        // Update the CSS code
        updateCssCode(clipPathValue);
    }
    
    // Update the CSS code display
    // Update the updateCssCode function
    function updateCssCode(clipPathValue) {
        $('#css-code').text(clipPathValue);
    }
    
    // Change the demo size
    function changeSize() {
        // Remove active class from all size buttons
        $('.size-btn').removeClass('active');
        
        // Add active class to selected size button
        $(this).addClass('active');
        
        // Get the new size
        demoSize = parseInt($(this).data('size'));
        
        // Update the demo element and control points container size
        $('#demo-element, #control-points-container').css({
            width: demoSize + 'px',
            height: demoSize + 'px'
        });
        
        // Update control points positions
        updateControlPointsPositions();
    }
    
    // Update control points positions after size change
    function updateControlPointsPositions() {
        const pointSize = 10;
        for (let i = 0; i < controlPoints.length; i++) {
            controlPoints[i].element.css({
                left: (controlPoints[i].x * demoSize / 100) - (pointSize / 2) + 'px',
                top: (controlPoints[i].y * demoSize / 100) - (pointSize / 2) + 'px'
            });
        }
    }
    
    // Change the demo background
    function changeBackground() {
        // Remove active class from all background options
        $('.bg-option').removeClass('active');
        
        // Add active class to selected background option
        $(this).addClass('active');
        
        // Get the background image
        const bgIndex = $(this).data('bg');
        demoBackground = `images/bg${bgIndex.slice(-1)}.jpg`;
        
        // Update the demo element background
        $('#demo-element').css('background-image', `url('${demoBackground}')`);
    }
    
    // Set custom background from URL
    function setCustomBackground() {
        const customUrl = $(this).val();
        
        if (customUrl) {
            // Remove active class from all background options
            $('.bg-option').removeClass('active');
            
            // Update the demo element background
            $('#demo-element').css('background-image', `url('${customUrl}')`);
        }
    }
    
    // Copy CSS code to clipboard
    function copyToClipboard() {
        const cssCode = $('#css-code').text();
        
        // Create a temporary textarea element
        const textarea = $('<textarea>');
        textarea.val(cssCode);
        $('body').append(textarea);
        
        // Select and copy the text
        textarea.select();
        document.execCommand('copy');
        
        // Remove the temporary textarea
        textarea.remove();
        
        // Show feedback
        const originalText = $('#copy-btn').text();
        $('#copy-btn').text('Copied!');
        
        // Reset button text after a delay
        setTimeout(function() {
            $('#copy-btn').text(originalText);
        }, 1500);
    }
    
    // Initialize the application
    init();
});
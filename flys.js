
class Individual {
    constructor(x, y) {
        // ball location
        this.x = x;
        this.y = y;
        // bezier path end location and lines
        this.px = x;
        this.py = y;
        this.lines = [];
        // velocity
        this.v = 0;
        // direction
        this.d = Math.random();
        // create and append element to frame
        this.self = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.self.setAttribute('cx', this.x);
        this.self.setAttribute('cy', this.y);
        this.self.setAttribute('r', 5);
        this.self.setAttribute('fill', 'black');
        document.querySelector('#frame').append(this.self);
        //
        this.keep_flowing = true;
    }
    move(x, y) {
        this.x = x;
        this.y = y;
        this.self.setAttribute('cx', this.x);
        this.self.setAttribute('cy', this.y);
    }
    line(amount) {
        // calculate triangle stuff for line
        var h = Math.random() * amount;
        var y = h * Math.sin(this.d * Math.PI * 2);
        var x = h * Math.cos(this.d * Math.PI * 2);
        if ((this.px + x) > 0 && (this.py + y) > 0 && (this.px + x) < window.innerWidth && (this.py + y) < window.innerHeight) {
            // create and configure line element
            var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', this.px);
            line.setAttribute('y1', this.py);
            line.setAttribute('x2', this.px + x);
            line.setAttribute('y2', this.py + y);
            line.setAttribute('class', 'path-line');
            line.setAttribute('stroke', 'none');
            document.querySelector('#frame').append(line);
            // append new line to object attribute
            this.lines.push([this.px, this.py, this.px + x, this.py + y]);
            // set line end attrs
            this.px = this.px + x;
            this.py = this.py + y;
            // set new direction as +- 25% current direction
            this.d = this.d + ((Math.random() * 0.25) - 0.125);
            if (this.d < 0) this.d = 1 + this.d;
        } else {
            this.d = Math.random();
            this.line(amount);
        }
    }
    flow(duration, numlines, maxline) {
        this.d = this.lines.length > 0 ? Math.atan(((this.lines[0][3] - this.lines[0][1]) / (this.lines[0][2] - this.lines[0][0]))) / (2 * Math.PI) : this.d;
        this.lines = [];
        for (var l = 0; l < numlines; l++) this.line(maxline);
        const ind = this;


        function subdivide(lines, portion) {
            var points = [];
            var result = [];
            for (var i = 0; i < lines.length; i++){
                var x = lines[i][0] + (portion * (lines[i][2] - lines[i][0]));
                var y = lines[i][1] + (portion * (lines[i][3] - lines[i][1]));
                points.push([x, y])
            }
            for (var j = 0; j < points.length - 1; j++){
                result.push([...points[j], ...points[j+1]]);
            }
            return result.length === 0 ? points[0] : subdivide(result, portion);
        }


        var i = 0;
        var interval = setInterval(function() {
            ind.move(...subdivide(ind.lines, i / duration));
            if (i < duration) {
                i += 10;
            } else {
                clearInterval(interval);
                ind.px = ind.x;
                ind.py = ind.y;
                document.querySelectorAll('line').forEach(el => el.remove());
                if (ind.keep_flowing) ind.flow(duration, numlines, maxline);
            }
        }, 10);
    }
}


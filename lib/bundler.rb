require 'fileutils'

require 'rubygems'
require 'closure-compiler'
require 'fewer'

class Bundler
  DIST_DIR = File.expand_path('../../dist', __FILE__)
  SRC_DIR = File.expand_path('../../src', __FILE__)

  class << self
    def bundle!
      FileUtils.mkdir_p(DIST_DIR)

      write "#{DIST_DIR}/supplement-#{version}.js" do
        Fewer::Engines::Js.new(SRC_DIR, files).read
      end

      write "#{DIST_DIR}/supplement-#{version}.min.js" do
        Fewer::Engines::Js.new(SRC_DIR, files, :min => true).read
      end
    end

    def bundled
      Fewer::Engines::Js.new(SRC_DIR, files).read
    end

    private
      def files
        @files ||= %w(
          array
          number
          object
        )
      end

      def header
        @header ||= File.read(File.join(SRC_DIR, 'header.js'))
      end

      def version
        @version ||= File.read('VERSION').strip
      end

      def write(path, &block)
        puts "Generating #{path}"

        File.open(path, 'w') do |f|
          f.write header.gsub('@VERSION', version)
          f.write yield.gsub('@VERSION', version)
        end
      end
  end
end